const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { User } = require('../models/index.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

const jwtSign = (payload) => {
    return jwt.sign(payload, process.env.SECRET)
}

passport.use(new JWTStrategy({
    secretOrKey: process.env.SECRET,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => { 
    try {
        const user = await User.findByPk(token.id)

        if (user) {
            done(null, user)
        }

        else {
            done(null, false)
        }
    } 
    catch (e) {
        done(error)
    }
}))
passport.use('login', new LocalStrategy({ 
    usernameField: 'email', 
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({where: { email: email } })

        if (!user) {
            return done(null, false, { message: 'User not found' })
        }

        const validate = await bcrypt.compare(password, user.password)

        if (!validate) {
            return done(null, false, { message: 'Wrong password' })
        }

        return done(null, user, { message: 'Logged in successfully' })
    } 
    catch (e) {
        console.error(e)
        return done(e)
    }
}))
passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const { body: { name } } = req
        const user = await User.create({
            name: name,
            email: email,
            password: password
        })
        if (!user) {
            return done(null, false, { message: 'unable to sign up user' })
        }
        done(null, user, { message: 'user created' })
    }
    catch (e) {
        done(e)
    }
}))
const authorized = (request, response, next) => {
    passport.authenticate('jwt', { session: false }, async (error, user) => {
      if (error || !user) {
        let err = new Error('No bueno, no access allowed')
        err.status = 401
        return next(err)
      }
      request.user = user
      console.log(user)
      return next()
    })(request, response, next)
  }

module.exports = { passport, jwtSign, authorized }