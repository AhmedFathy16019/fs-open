const blogsRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    
    response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    
    if (!body.title || !body.author) {
        return response.status(400).end()
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: request.user._id
    })

    await blog.save()
    
    const result = await Blog.findOne({ title: blog.title }).populate('user', { username: 1, name: 1 })

    request.user.blogs = request.user.blogs.concat(result._id)
    await request.user.save()

    response.status(201).json(result)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const id = request.params.id


    const blog = await Blog.findById(id)

    if (blog.user.toString() === request.user._id.toString()){
        await Blog.findByIdAndRemove(id)
        request.user.blogs = request.user.blogs.filter(blog => blog !== id)
        await request.user.save()
        response.status(204).end()
    } else {
        response.status(401).json({ error: 'invalid token, not authorized to remove blog' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id

    const updatedBlog = request.body

    const result = await Blog.findByIdAndUpdate(id, updatedBlog, {new:true, runValidators:true, context:'query'})
    response.json(result)    
})

module.exports = blogsRouter