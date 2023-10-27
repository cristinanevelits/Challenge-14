import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class Comment extends Model {}

Comment.init(
  {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
  }
);


export default Comment;