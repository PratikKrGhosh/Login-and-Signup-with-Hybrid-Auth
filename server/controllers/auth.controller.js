import { createUser, findUserByUsername } from "../services/user.services.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";

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

    return res.status(200).redirect("/");
  } catch (err) {
    return res.status(400).send("Something Went Wrong");
  }
};
