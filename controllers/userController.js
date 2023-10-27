import User from "../models/user.js";
import { compare, hash } from "bcrypt";

const userController = {
  renderSignupForm: (req, res) => {
    res.render("partials/signup");
  },

  signupUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(409).json({ message: "Username already in use" });
      }

      const hashedPassword = await hash(password, 10);

      const newUser = await User.create({ username, password: hashedPassword });

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  renderLoginForm: (req, res) => {
    res.render("partials/login");
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ message: "Incorrect username" });
      }

      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      req.session.user = user;

      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // Log out a user
  logoutUser: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};

export default userController;
