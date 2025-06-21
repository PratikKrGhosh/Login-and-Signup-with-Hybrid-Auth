// importing all files
import { createUser, findUserByUsername } from "../services/user.services.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import {
  createSession,
  deleteSession,
  findSessionById,
} from "../services/session.services.js";
import { create_tokens_and_insert_cookies } from "../utils/token.cookie.js";

// handling page routes
export const getSignupPage = (req, res) => {
  try {
    if (req.user) return res.redirect("/");
    return res.status(200).render("signup", { errors: req.flash("errors") });
  } catch (err) {
    return res.status(404).send("Page not Found");
  }
};

export const getLoginPage = (req, res) => {
  try {
    if (req.user) return res.redirect("/");
    return res.status(200).render("login", { errors: req.flash("errors") });
  } catch (err) {
    return res.status(404).send("Page not Found");
  }
};

// handling auth functionalities
export const signup = async (req, res) => {
  try {
    if (req.user) return res.redirect("/");

    const { name, userName, email, password } = req.body;

    const hashedPassword = await hashPassword(password);

    const newUser = await createUser({
      name,
      userName,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      req.flash("errors", "Couldn't create user");
      return res.redirect("/signup");
    }

    return res.status(201).redirect("/login");
  } catch (err) {
    req.flash("errors", "Something Went Wrong");
    return res.redirect("/signup");
  }
};

export const login = async (req, res) => {
  try {
    if (req.user) return res.redirect("/");

    const { userName, password } = req.body;
    const userData = await findUserByUsername(userName);

    if (!userData) {
      req.flash("errors", "Incorrect User Name or Password");
      return res.redirect("/login");
    }

    const comparePassword = await verifyPassword({
      hashedPassword: userData.password,
      password,
    });

    if (!comparePassword) {
      req.flash("errors", "Incorrect User Name or Password");
      return res.redirect("/login");
    }

    const newSession = await createSession({
      userId: userData.id,
      userAgent: req.headers["user-agent"],
      ip: req.clientIp,
    });

    create_tokens_and_insert_cookies(userData, newSession);

    return res.status(200).redirect("/");
  } catch (err) {
    req.flash("errors", "Something Went Wrong");
    return res.redirect("/login");
  }
};

export const logout = async (req, res) => {
  try {
    if (!req.user) return res.redirect("/");

    const checkSession = await findSessionById(req.user.sessionId);
    if (!checkSession) return res.redirect("/login");

    await deleteSession(req.user.sessionId);

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    return res.redirect("/login");
  } catch (err) {
    return res.status(400).send("Something Went Wrong");
  }
};
