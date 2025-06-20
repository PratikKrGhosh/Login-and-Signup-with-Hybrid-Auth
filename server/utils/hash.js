import argon2 from "argon2";
import env from "../config/env.js";

export const hashPassword = async (password) => {
  try {
    return await argon2.hash(password);
  } catch (err) {
    return null;
  }
};

export const verifyPassword = async ({ hashedPassword, password }) => {
  try {
    return await argon2.verify(hashedPassword, password);
  } catch (err) {
    return false;
  }
};
