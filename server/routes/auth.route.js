import express from "express";
import * as authController from "../controllers/auth.controller.js";
const authRoute = express.Router();

authRoute
  .route("/signup")
  .get(authController.getSignupPage)
  .post(authController.signup);

authRoute
  .route("/login")
  .get(authController.getLoginPage)
  .post(authController.login);

export default authRoute;
