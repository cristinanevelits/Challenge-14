import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("partials/home");
});

router.get("/signup", (req, res) => {
  res.render("partials/signup");
});

router.get("/dashboard", (req, res) => {
  res.render("partials/dashboard");
});

router.get("/login", (req, res) => {
  res.render("partials/login");
});

router.get("/posts", (req, res) => {
  res.render("partials/post");
});

export default router;
