// importing all files
import { findSessionById } from "../services/session.services.js";
import { findUserById } from "../services/user.services.js";
import { create_tokens_and_insert_cookies } from "../utils/token.cookie.js";
import { verifyToken } from "../utils/token.js";

// creating auth middleware
export const authMiddleware = async (req, res, next) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  // if access token exists
  if (accessToken) {
    const decodedToken = verifyToken(accessToken);
    req.user = decodedToken;
    return next();
  }

  // if refresh token exists but access token does not
  if (refreshToken) {
    const decodedToken = verifyToken(refreshToken);
    const currentSession = await findSessionById(decodedToken.sessionId);

    // if the session is valid
    if (currentSession && currentSession.valid) {
      const userData = await findUserById(currentSession.userId);

      const { accessToken } = create_tokens_and_insert_cookies(res, {
        userData,
        sessionData: currentSession,
      });

      const decodedAccessToken = verifyToken(accessToken);
      req.user = decodedAccessToken;
      return next();
    }
  }

  req.user = null;
  return next();
};
