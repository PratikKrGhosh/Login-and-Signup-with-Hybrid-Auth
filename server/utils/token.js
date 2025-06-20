import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const signToken = async (data, time) => {
  try {
    return jwt.sign(data, env.key, { expiresIn: time });
  } catch (err) {
    return null;
  }
};

export const verifyToken = async (token) => {
  try {
    return jwt.verify(token, env.key);
  } catch (err) {
    return null;
  }
};
