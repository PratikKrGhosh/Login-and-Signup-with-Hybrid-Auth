import { createUser, findUserByUsername } from "../services/user.services.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import { ACCESS_TOKEN_EXPIRY, MILI_SEC } from "../config/constants.js";
import { signToken } from "../utils/token.js";

export const getSignupPage = (req, res) => {
  try {
    return res.status(200).render("signup");
  } catch (err) {
    return res.status(404).send("Page not Found");
  }
};

export const getLoginPage = (req, res) => {
  try {
    return res.status(200).render("login");
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

    if (!newUser) return res.send("User Not Created");

    return res.status(201).redirect("/login");
  } catch (err) {
    return res.status(400).send("Something Went Wrong");
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const userData = await findUserByUsername(userName);

    if (!userData) return res.send("No user Found");

    const comparePassword = await verifyPassword({
      hashedPassword: userData.password,
      password,
    });

    if (!comparePassword) return res.send("Wrong Password");

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
    return res.status(400).send("Something Went Wrong");
  }
};
