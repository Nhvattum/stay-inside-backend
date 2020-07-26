require('dotenv').config()
const express = require('express')
const router = express.Router()

const Event = require('../models/Event')

// API ROUTES

// GET -- post events to home page
router.get("/", (req, res) => {
    Event.find()
        .populate("postedBy")
        .then(events => {
            res.send(events)
        }).catch(error => {
            res.send({message: "Server error"})
            console.error(error)
        })
})

// POST -- add created event to db
router.post('/create', (req, res) => {
    Event.create(req.body)
        .then(newEvent => {
            res.send(newEvent)
        }).catch(error => {
            res.send({message: 'Server error'})
            console.error(error)
        })
})

// PUT -- edit said event
router.put('/:id', (req, res) => {
    Event.findOneAndUpdate({ _id: req.params.id },
        req.body,
        {new: true}
        )
        .then(updatedEvent => {
            res.send(updatedEvent)
        })
        .catch(error => {
            res.send({message: 'Server error'})
            console.error(error)
        })
})

// DELETE -- delete said events
router.delete('/:id', (req, res) => {
    Event.findByIdAndDelete({ _id: req.params.id})
        .then(deleteEvent => {
            res.send('Event Deleted')
            console.log(deleteEvent)
        }).catch(error => {
            res.send({message: 'Server error'})
            console.error(error)
        })
})

module.exports = router;