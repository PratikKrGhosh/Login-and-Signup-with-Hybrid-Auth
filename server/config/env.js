import dotenv from "dotenv";

dotenv.config();

const config = {
  dev: {
    db: process.env.DB_URI,
    port: process.env.PORT || 5000,
    key: process.env.TOKEN_KEY,
    log: "debug",
  },
  test: {
    db: process.env.DB_URI,
    port: process.env.PORT || 5000,
    key: process.env.TOKEN_KEY,
    log: "info",
  },
  production: {
    db: process.env.DB_URI,
    port: process.env.PORT || 5000,
    key: process.env.TOKEN_KEY,
    log: "error",
  },
};

const stage = process.env.STAGE || "dev";
export default config[stage];
