import seed from "@/data/db.json";

/** Read-only access to db.json for server components. */
export default seed;
export type Seed = typeof seed;
