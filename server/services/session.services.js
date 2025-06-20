import { eq } from "drizzle-orm";
import db from "../config/db.js";
import { sessionTable } from "../drizzle/schema.js";

export const createSession = async ({ userId, userAgent, ip }) => {
  const [newSession] = await db
    .insert(sessionTable)
    .values({ userId, userAgent, ip })
    .$returningId();
  return newSession;
};

export const deleteSession = async (id) => {
  const [deletedSession] = await db
    .delete(sessionTable)
    .where(eq(sessionTable.id, id));
  return deletedSession;
};

export const findSessionById = async (id) => {
  const [deletedSession] = await db
    .select()
    .from(sessionTable)
    .where(eq(sessionTable.id, id));
  return deletedSession;
};
