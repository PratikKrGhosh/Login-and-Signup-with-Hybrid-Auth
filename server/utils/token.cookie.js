import {
  ACCESS_TOKEN_EXPIRY,
  MILI_SEC,
  REFRESH_TOKEN_EXPIRY,
} from "../config/constants.js";
import { signToken } from "./token.js";

export const create_tokens_and_insert_cookies = (
  res,
  { userData, sessionData }
) => {
  try {
    const accessToken = signToken(
      {
        name: userData.name,
        userName: userData.userName,
        email: userData.email,
        sessionId: sessionData.id,
      },
      ACCESS_TOKEN_EXPIRY / MILI_SEC
    );

    const refreshToken = signToken(
      { sessionId: sessionData.id },
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
  } catch (err) {
    return { accessToken: null, refreshToken: null };
  }
};
