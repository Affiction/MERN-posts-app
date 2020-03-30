const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String
  },
  text: {
    type: String,
    required: true
  },
  comments: [
    {
      user: {
        type: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        }
      },
      name: {
        type: String
      },
      test: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
