const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const CommentSchema = new Schema ({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Comment = mongoose.model('comments', CommentSchema)
