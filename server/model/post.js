const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const postSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
}, {
  collection: 'post',
  versionKey: false
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;