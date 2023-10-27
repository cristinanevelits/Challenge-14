import sequelize from "./config/database.js";
import User from "./models/user.js";
import Post from "./models/post.js";
import Comment from "./models/comment.js";
import { hash } from "bcrypt";

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });

    const userData = [
      {
        username: "user1",
        password: await hash("password1", 10),
      },
      {
        username: "user2",
        password: await hash("password2", 10),
      },
    ];

    await User.bulkCreate(userData);

    const postData = [
      {
        title: "Sample Post 1",
        content: "This is the content of the first post.",
        userId: 1,
      },
      {
        title: "Sample Post 2",
        content: "This is the content of the second post.",
        userId: 2,
      },
    ];

    await Post.bulkCreate(postData);

    const commentData = [
      {
        text: "This is a comment on the first post.",
        userId: 2,
        postId: 1,
      },
      {
        text: "Another comment on the first post.",
        userId: 1,
        postId: 1,
      },
    ];

    await Comment.bulkCreate(commentData);

    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    sequelize.close();
  }
}

seedDatabase();
