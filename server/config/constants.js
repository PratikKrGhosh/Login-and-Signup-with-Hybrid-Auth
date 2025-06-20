export const MILI_SEC = 1000;
const SEC_MIN = 60;
const MIN_HOUR = 60;
const HOUR_DAY = 24;

export const ACCESS_TOKEN_EXPIRY = 15 * MIN_HOUR * SEC_MIN * MILI_SEC;
export const SESSION_TOKEN_EXPIRY =
  15 * HOUR_DAY * MIN_HOUR * SEC_MIN * MILI_SEC;
