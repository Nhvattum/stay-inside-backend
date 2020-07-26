// Event Schema
// playlistID: integer, comment [ref: comment]
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema ({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: User
    },
    title: {
        type: String,
        required: true
    },
    eventLink: {
        type: String
    },
    description: {
        type: String
    }
    // playlistID goes here type: Int ref
    // comments: {
    //     type: mongoose.Schema.Types.ObjectId, ref: Comment
    // }
})

module.exports = Event = mongoose.model('events', EventSchema)