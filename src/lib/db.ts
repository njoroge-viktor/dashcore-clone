"use client";

/**
 * Tiny json-server–style data layer.
 *
 * Seed data lives in src/data/db.json and is bundled at build time, so it
 * works on static hosting (Netlify) with no backend. Writes from a visitor
 * (create / update / remove) are stored in that visitor's browser
 * (localStorage) layered over the seed. To share data between visitors,
 * swap the `load` / `save` functions below for calls to Netlify Blobs,
 * a Netlify Function, or any hosted database — the hook API stays the same.
 */

import { useCallback, useEffect, useState } from "react";
import rawSeed from "@/data/db.json";

export type ContactMessage = { id: string; name: string; email: string; subject: string; message: string; source: string; createdAt: string };
export type Signup = { id: string; email: string; source: string; createdAt: string };

type Raw = typeof rawSeed;
export type DB = Omit<Raw, "contactMessages" | "subscribers" | "waitlist"> & {
  contactMessages: ContactMessage[];
  subscribers: Signup[];
  waitlist: Signup[];
};
const seed = rawSeed as unknown as DB;
export type Collection = keyof DB;
type Row<C extends Collection> = DB[C] extends Array<infer R> ? R : never;

const KEY = (c: string) => `corevia-db:${c}`;
const EVT = "corevia-db-change";

function load<C extends Collection>(c: C): Row<C>[] {
  if (typeof window === "undefined") return seed[c] as Row<C>[];
  try {
    const raw = localStorage.getItem(KEY(c));
    if (raw) return JSON.parse(raw);
  } catch {}
  return structuredClone(seed[c]) as Row<C>[];
}

function save<C extends Collection>(c: C, rows: Row<C>[]) {
  try {
    localStorage.setItem(KEY(c), JSON.stringify(rows));
  } catch {}
  window.dispatchEvent(new CustomEvent(EVT, { detail: c }));
}

export const uid = (p = "id") => `${p}_${Math.random().toString(36).slice(2, 10)}`;

/* ---------- Imperative API (like json-server REST calls) ---------- */
export const db = {
  list<C extends Collection>(c: C) {
    return load(c);
  },
  get<C extends Collection>(c: C, id: string) {
    return load(c).find((r) => (r as { id: string }).id === id);
  },
  create<C extends Collection>(c: C, row: Row<C>) {
    const rows = [...load(c), row];
    save(c, rows);
    return row;
  },
  update<C extends Collection>(c: C, id: string, patch: Partial<Row<C>>) {
    const rows = load(c).map((r) => ((r as { id: string }).id === id ? ({ ...(r as object), ...(patch as object) } as Row<C>) : r));
    save(c, rows);
    return rows.find((r) => (r as { id: string }).id === id);
  },
  remove<C extends Collection>(c: C, id: string) {
    save(c, load(c).filter((r) => (r as { id: string }).id !== id));
  },
  reset(c?: Collection) {
    const cs = c ? [c] : (Object.keys(seed) as Collection[]);
    cs.forEach((k) => {
      try {
        localStorage.removeItem(KEY(k));
      } catch {}
      window.dispatchEvent(new CustomEvent(EVT, { detail: k }));
    });
  },
};

/* ---------- React hook ---------- */
export function useCollection<C extends Collection>(c: C) {
  // Start from seed so server and first client render match, then hydrate.
  const [rows, setRows] = useState<Row<C>[]>(seed[c] as Row<C>[]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setRows(load(c));
    setReady(true);
    const onChange = (e: Event) => {
      if ((e as CustomEvent).detail === c) setRows(load(c));
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY(c)) setRows(load(c));
    };
    window.addEventListener(EVT, onChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(EVT, onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, [c]);

  return {
    rows,
    ready,
    create: useCallback((row: Row<C>) => db.create(c, row), [c]),
    update: useCallback((id: string, patch: Partial<Row<C>>) => db.update(c, id, patch), [c]),
    remove: useCallback((id: string) => db.remove(c, id), [c]),
    reset: useCallback(() => db.reset(c), [c]),
  };
}

