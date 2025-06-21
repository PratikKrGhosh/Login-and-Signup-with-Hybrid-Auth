import { eq } from "drizzle-orm";
import db from "../config/db.js";
import { sessionTable } from "../drizzle/schema.js";

export const createSession = async ({ userId, userAgent, ip }) => {
  try {
    const [newSession] = await db
      .insert(sessionTable)
      .values({ userId, userAgent, ip })
      .$returningId();
    return newSession;
  } catch (err) {
    return null;
  }
};

export const deleteSession = async (id) => {
  try {
    const [deletedSession] = await db
      .delete(sessionTable)
      .where(eq(sessionTable.id, id));
    return deletedSession;
  } catch (err) {
    return null;
  }
};

export const findSessionById = async (id) => {
  try {
    const [deletedSession] = await db
      .select()
      .from(sessionTable)
      .where(eq(sessionTable.id, id));
    return deletedSession;
  } catch (err) {
    return null;
  }
};
