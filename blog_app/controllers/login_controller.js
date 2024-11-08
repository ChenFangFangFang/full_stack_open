const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    //search the user in the DB
    const user = await User.findOne({ username })
    try {
        await bcrypt.compare(password, user.passwordHash)
    } catch (error) {
        console.log('error:', error)
    }

    //check the PW
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    //login successfully, token crearted, contains username and id
    const userForToken = {
        username: user.username,
        id: user._id,
    }

    // token expires in 60 * 60 seconds, that is, in one hour
    // user need to re-login
    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        // { expiresIn: 60 * 60 }
    )
    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter