const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (request, response) => {
    const {username, password} = request.body

    const userFetched = await User.findOne({ username })

    const passwordCorrect = userFetched === null
        ? false
        : await bcrypt.compare(password, userFetched.passwordHash)

    if (!(userFetched && passwordCorrect)) {
        return response.status(401).json({ error: 'invalid username or password' })
    }

    const userForToken = {
        username: userFetched.username,
        id: userFetched._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200).send({ token, username: userFetched.username, name: userFetched.name })
})

module.exports = loginRouter