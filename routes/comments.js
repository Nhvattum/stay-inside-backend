require('dotenv').config()
const express = require('express')
const router = express.Router()
const Comment = require('../controllers/comment')


// Index
router.get('/', Comment.index)
  
// Create
router.post('/', (req, res) => {
  // check the body of the request for empty string and remove them from the body
  Comment.create(req.body)
    .then(newComment => {
      res.send(newComment)
    })
    .catch(err => console.error(err))
})
  
// Update
router.put('/:id', (req, res) => {
  
  Comment.findOneAndUpdate(
    {_id: req.params.id},
    req.body,
    { new: true }
  )
  .then(updatedComment => {
    res.send(updatedComment)
  })
  .catch(err => console.error(err))
})
  
// Delete
router.delete('/:id', (req, res) => {
  
  Comment.findOneAndDelete({_id: req.params.id })
    .then(deleteComment => {
      console.log(deleteComment)
      res.send({message: 'Successful Deletion'})
    })
    .catch(err => console.error(err))
})

module.exports = router;
