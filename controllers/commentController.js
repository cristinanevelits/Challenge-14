import Comment from "../models/comment.js";

const CommentController = {
  createComment: async (req, res) => {
    try {
      const { text } = req.body;
      const postId = req.params.postId;
      const userId = req.user.id;

      const newComment = await Comment.create({
        text,
        UserId: userId,
        PostId: postId,
      });

      res.status(201).json(newComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default CommentController;
