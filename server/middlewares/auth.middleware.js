import { verifyToken } from "../utils/token.js";

export const authMiddleware = (req, res, next) => {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    req.user = null;
    return next();
  }

  try {
    const decodedToken = verifyToken(accessToken);
    req.user = decodedToken;
  } catch (err) {
    req.user = null;
  }
  return next();
};
