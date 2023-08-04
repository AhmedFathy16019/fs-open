const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })

    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body

    if (!password || password.length < 3) {
        return response.status(400).json({ error: 'invalid password, must be at least three characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await newUser.save()

    response.status(200).json(savedUser)
})

module.exports = usersRouter