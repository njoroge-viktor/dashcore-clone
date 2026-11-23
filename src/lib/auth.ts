"use client";

/**
 * Demo authentication backed by the db.json "users" collection.
 * Passwords are compared as SHA-256 hashes; the session is kept in
 * localStorage. This is for the template demo only — use a real auth
 * provider (Auth.js, Clerk, Supabase…) in production.
 */

import { useEffect, useState } from "react";
import { db, uid } from "./db";

const SESSION = "corevia-session";
const EVT = "corevia-session-change";

export type Session = { userId: string; name: string; email: string };

export async function sha256(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function setSession(s: Session | null, remember = true) {
  try {
    const store = remember ? localStorage : sessionStorage;
    localStorage.removeItem(SESSION);
    sessionStorage.removeItem(SESSION);
    if (s) store.setItem(SESSION, JSON.stringify(s));
  } catch {}
  window.dispatchEvent(new Event(EVT));
}

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION) ?? sessionStorage.getItem(SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function login(email: string, password: string, remember: boolean) {
  const user = db.list("users").find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  if (!user || user.passwordHash !== (await sha256(password))) throw new Error("Incorrect email or password.");
  setSession({ userId: user.id, name: `${user.firstName} ${user.lastName}`, email: user.email }, remember);
}

export async function signup(data: { firstName: string; lastName: string; email: string; password: string }) {
  const exists = db.list("users").some((u) => u.email.toLowerCase() === data.email.trim().toLowerCase());
  if (exists) throw new Error("An account with this email already exists.");
  const user = {
    id: uid("u"),
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim(),
    passwordHash: await sha256(data.password),
    createdAt: new Date().toISOString(),
  };
  db.create("users", user);
  db.update("profile", "me", { fullName: `${user.firstName} ${user.lastName}`, email: user.email });
  setSession({ userId: user.id, name: `${user.firstName} ${user.lastName}`, email: user.email });
}

let lastLogout = 0;

export function logout() {
  lastLogout = Date.now();
  setSession(null);
}

/** True right after a deliberate sign-out, so route guards don't bounce to /auth/login. */
export const justLoggedOut = () => Date.now() - lastLogout < 3000;

export function useSession() {
  const [session, set] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const sync = () => set(getSession());
    sync();
    setReady(true);
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return { session, ready };
}

export function passwordStrength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return { score: s, label: ["Too weak", "Weak", "Fair", "Good", "Strong"][s] };
}
