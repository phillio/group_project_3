const express = require('express');
const authRouter = express.Router();
const { passport, jwtSign } = require('../auth/auth');

authRouter.post('/login', (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if(err) {
                const error = new Error(`A Login Error Occurred: ${JSON.stringify(info)}`)
                return next(error)
            }

            if(!user) {
                let error = new Error(info.message || 'LOGIN ERROR')
                error.status = 400
                return next(error)
            }

            req.login(user, { session: false }, async (error) => {
                if (error) {
                    return next(error)
                } 
                const { email, id } = user
                const tokenPayload = { email, id }
                const token = jwtSign(tokenPayload)
                return res.json({ user, token })
            })

        } catch (e) {
            console.error(e)
            return next(e)
        }
    }) (req, res, next)
})

authRouter.post('/signup', (req, res, next) => {
    passport.authenticate('signup', (err, user, info) => {
        try {
            if (err) {
                const error = new Error(`A Signup Error Occurred: ${JSON.stringify(info)}`)
                return next(error)
            }

            if(!user) {
                let error = new Error(info.message || 'SIGNUP ERROR')
                error.status = 400
                return next(error)
            }

            const { email, id } = user
            const tokenPayload = { email, id }
            const token = jwtSign(tokenPayload)
            return res.json({user, token, message: info.message })
        } catch (e) {
            return next(e)
        }
    }) (req, res, next)
})

module.exports = authRouter