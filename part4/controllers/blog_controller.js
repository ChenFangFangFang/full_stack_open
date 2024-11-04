const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/api/blog', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })

})

blogRouter.delete('/api/blog/:id', (request, response, next) => {
    Blog.findOneAndDelete(request.params.id)
        .then(request => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

blogRouter.post('/api/blog', (request, response) => {
    const body = request.body
    if (!body.title || !body.author || !body.url || !body.likes) {
        return response.status(400).json({ error: 'content missing' })
    }
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })
    blog.save().then(saveBlog => {
        response.json(saveBlog)
    })

})

blogRouter.put('/api/blog/:id', (request, response, next) => {
    const body = request.body
    if (!body.title || !body.author || !body.url || !body.likes) {
        return response.status(400).json({ error: 'content missing' })
    }
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
        .then(updateBlog => {
            response.json(updateBlog)
        })
        .catch(error => next(error))
})



module.exports = blogRouter