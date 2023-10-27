import express from "express";
import userController from "../controllers/userController.js";
import postController from "../controllers/postController.js";
import commentController from "../controllers/commentController.js";

const router = express.Router();

router.post("/api/signup", userController.signupUser);
router.post("/api/login", userController.loginUser);
router.get("/api/logout", userController.logoutUser);

router.get("/api/posts", postController.getAllPosts);
router.post("/api/posts/new", postController.createPost);

router.post("/api/posts/:postId/comments/new", commentController.createComment);

export default router;
