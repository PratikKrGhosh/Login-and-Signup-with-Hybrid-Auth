import { createUser, findUserByUsername } from "../services/user.services.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import { ACCESS_TOKEN_EXPIRY, MILI_SEC } from "../config/constants.js";
import { signToken } from "../utils/token.js";

export const getSignupPage = (req, res) => {
  try {
    return res.status(200).render("signup", { errors: req.flash("errors") });
  } catch (err) {
    return res.status(404).send("Page not Found");
  }
};

export const getLoginPage = (req, res) => {
  try {
    return res.status(200).render("login", { errors: req.flash("errors") });
  } catch (err) {
    return res.status(404).send("Page not Found");
  }
};

export const signup = async (req, res) => {
  try {
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

    const accessToken = await signToken(
      {
        name: userData.name,
        userName: userData.userName,
        email: userData.email,
      },
      ACCESS_TOKEN_EXPIRY / MILI_SEC
    );

    res.cookie("access_token", accessToken);
    return res.status(200).redirect("/");
  } catch (err) {
    req.flash("errors", "Something Went Wrong");
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("access_token");
    return res.redirect("/login");
  } catch (err) {
    return res.status(400).send("Something Went Wrong");
  }
};
