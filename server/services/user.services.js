import { eq } from "drizzle-orm";
import db from "../config/db.js";
import { usersTable } from "../drizzle/schema.js";

export const createUser = async ({ name, userName, email, password }) => {
  const [user] = await db
    .insert(usersTable)
    .values({ name, userName, email, password });

  return user;
};

export const findUserByUsername = async (userName) => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.userName, userName));

  return user;
};
