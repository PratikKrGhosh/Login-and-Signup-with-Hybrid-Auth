import { eq } from "drizzle-orm";
import db from "../config/db.js";
import { usersTable } from "../drizzle/schema.js";

export const createUser = async ({ name, userName, email, password }) => {
  try {
    const [user] = await db
      .insert(usersTable)
      .values({ name, userName, email, password });

    return user;
  } catch (err) {
    return null;
  }
};

export const findUserByUsername = async (userName) => {
  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.userName, userName));

    return user;
  } catch (err) {
    return null;
  }
};

export const findUserById = async (id) => {
  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));

    return user;
  } catch (err) {
    return null;
  }
};
