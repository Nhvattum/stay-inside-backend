require('dotenv').config()
const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

// load User model
const User = require('../models/User')

// API ROUTES

// user test route
router.get('/test', function(req, res) {
    res.json({msg: 'Users endpoint working A okay'})
})

// STRETCH: SEARCH FOR USERS VIA SEARCH BAR
router.get('/search', (req, res) => {
    User.findOne({name: req.body.name})
    .then(searchedUser => {
        if (!searchedUser) {
            res.send('no user by that name, please try again')
        } else {
            res.send(searchedUser)
        }
    }).catch(error => {
        res.send({message: 'Server error, please try again'})
        console.log(error)
    })
})

// GET api user already registered
router.post('/register', function(req, res) {
    
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user){
            // send error if user already exists
            return res.status(400).json({email: 'Email already exists'})
        // else create newUser
        } else {
            // create an avatar from Gravatar
            const avatar = gravatar.url(req.body.email, {
                s:'200',
                r: 'pg',
                d: 'mm'
            })
            // create mew User
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err)  {
                        throw err
                    }
                    // if no error, set password to hash
                    newUser.password = hash
                    newUser.save()
                        // delete json send for security long term
                        .then(user => res.status(207).json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    })
})

// GET log people in and check their credentials against existing User data
router.post('/login', function (req, res) {
    const email = req.body.email
    const password = req.body.password

    // check for user credentials against existing user data
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({email: 'user not found' })
            }

            // see if hashed pass matches inputed pass
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    // if we are good to go, pass signed jwt token to users header (sign our jwt token)
                    if (isMatch) {
                        // create token payload
                        const payload = { id: user.id, name: user.name, avatar: user.avatar }
                        // sign token
                        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                            res.json({ success: true, token: "Bearer " + token})
                        })
                    } else {
                        // if password doesn't match
                        return res.status(400).json({password: 'Password incorrect.'})
                    }
                })
        })
})

// GET if already logged in, set user data to current

module.exports = router

