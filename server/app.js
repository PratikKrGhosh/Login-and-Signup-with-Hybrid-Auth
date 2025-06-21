// importing all modules
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import path from "path";
import requestIp from "request-ip";

// importing all files
import { authMiddleware } from "./middlewares/auth.middleware.js";
import authRoute from "./routes/auth.route.js";

// creating app
const app = express();

// all middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  session({ secret: "my-secret", resave: true, saveUninitialized: false })
);
app.use(flash());

app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "..", "client", "views"));
app.use(
  express.static(path.join(import.meta.dirname, "..", "client", "public"))
);

app.use(requestIp.mw());
app.use(authMiddleware);
app.use((req, res, next) => {
  res.locals.user = req.user;
  return next();
});

// creating all Routes
app.use("/", authRoute);

app.get("/", (req, res) => {
  if (!req.user) return res.render("index");

  res.status(200).render("home");
});

// handling all undefined routes
app.use("/", (req, res) => {
  res.status(404).send("Page Not Found");
});

// exporting app
export default app;
