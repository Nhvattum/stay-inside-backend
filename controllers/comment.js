const Comment = require('../models/Comment')

async function index(req, res) {
    try {
        const comments = await Comment.findOne()
            .populate('postedBy', 'name')
        res.json(comments)
    }
    catch(error) {
        console.log(error)
        res.sendStatus(500)
    }
}

module.exports = {
    index
}