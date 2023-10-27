import Post from "../models/post.js";
const PostController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll();

      res.render("partials/post", { posts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  createPost: async (req, res) => {
    try {
      const { title, content } = req.body;
      const userId = req.user.id;

      const newPost = await Post.create({ title, content, UserId: userId });

      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default PostController;
