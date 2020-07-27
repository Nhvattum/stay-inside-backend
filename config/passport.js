require('dotenv').config()
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User')

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.JWT_SECRET

module.exports = passport => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        // tell user model use user model to findById if jwt_payload id exists
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user)
                }
                return done(null, false)
            })
        .catch(err => console.log(err))
    }))
} 

