import User from './user.js';
import Post from './post.js';
import Comment from './comment.js';

User.hasMany(Post, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
  foreignKey: 'postId',
  onDelete: 'CASCADE',
});
