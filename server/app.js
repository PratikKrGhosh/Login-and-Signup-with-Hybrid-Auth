import express from "express";
import path from "path";
import authRoute from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "..", "client", "views"));
app.use(
  express.static(path.join(import.meta.dirname, "..", "client", "public"))
);

app.use("/", authRoute);

app.get("/", (req, res) => {
  res.status(200).render("home");
});

export default app;
