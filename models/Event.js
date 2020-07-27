  
// Event Schema
// playlistID: integer
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Types

const EventSchema = new Schema ({
    postedBy: {
        type: ObjectId, 
        ref: 'User'
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
    },
    // playlistID goes here type: Int ref
    comments: [{
        type: ObjectId,
        ref: 'Comment'
    }]
})

module.exports = Event = mongoose.model('Event', EventSchema)