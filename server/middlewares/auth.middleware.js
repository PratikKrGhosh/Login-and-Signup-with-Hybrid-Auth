import {
  ACCESS_TOKEN_EXPIRY,
  MILI_SEC,
  REFRESH_TOKEN_EXPIRY,
} from "../config/constants.js";
import { findSessionById } from "../services/session.services.js";
import { findUserById } from "../services/user.services.js";
import { signToken, verifyToken } from "../utils/token.js";

export const authMiddleware = async (req, res, next) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  if (accessToken) {
    const decodedToken = verifyToken(accessToken);
    req.user = decodedToken;
    return next();
  }

  if (refreshToken) {
    const decodedToken = verifyToken(refreshToken);
    const currentSession = await findSessionById(decodedToken.sessionId);

    if (currentSession && currentSession.valid) {
      const userData = await findUserById(currentSession.userId);

      const accessToken = signToken(
        {
          name: userData.name,
          userName: userData.userName,
          email: userData.email,
          sessionId: currentSession.id,
        },
        ACCESS_TOKEN_EXPIRY / MILI_SEC
      );

      const newRefreshToken = signToken(
        { sessionId: currentSession.id },
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

      res.cookie("refresh_token", newRefreshToken, {
        ...baseConfig,
        maxAge: REFRESH_TOKEN_EXPIRY,
      });

      const decodedAccessToken = verifyToken(accessToken);
      req.user = decodedAccessToken;
      return next();
    }
  }

  req.user = null;
  return next();
};
