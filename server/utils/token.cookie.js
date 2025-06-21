import {
  ACCESS_TOKEN_EXPIRY,
  MILI_SEC,
  REFRESH_TOKEN_EXPIRY,
} from "../config/constants.js";
import { signToken } from "./token.js";

export const create_tokens_and_insert_cookies = (user, session) => {
  const accessToken = signToken(
    {
      name: user.name,
      userName: user.userName,
      email: user.email,
      sessionId: session.id,
    },
    ACCESS_TOKEN_EXPIRY / MILI_SEC
  );

  const refreshToken = signToken(
    { sessionId: session.id },
    REFRESH_TOKEN_EXPIRY / MILI_SEC
  );

  const baseConfig = {
    httpOnly: true,
    secure: true,
  };

  res.cookie("access_token", accessToken, {
    ...baseConfig,
    maxAge: ACCESS_TOKEN_EXPIRY,
  });

  res.cookie("refresh_token", refreshToken, {
    ...baseConfig,
    maxAge: REFRESH_TOKEN_EXPIRY,
  });

  return { accessToken, refreshToken };
};
