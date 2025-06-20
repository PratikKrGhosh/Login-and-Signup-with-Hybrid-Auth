import env from "./env.js";
import { drizzle } from "drizzle-orm/mysql2";

const db = drizzle(env.db);

export default db;
