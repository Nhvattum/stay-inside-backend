const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types

// User Schema
const CommentSchema = new Schema ({
  postedBy: {
    type: ObjectId,
    ref: 'User',
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

module.exports = Comment = mongoose.model('Comment', CommentSchema)
