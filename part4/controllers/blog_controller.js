const blogRouter = require('express').Router();
const Blog = require('../models/blog');

// GET all blogs
blogRouter.get('/', (request, response, next) => {
    Blog.find({})
        .then(blogs => response.json(blogs))
        .catch(error => next(error));
});

// DELETE a blog by ID
blogRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end();
        })
        .catch(error => next(error));
});

// POST a new blog
blogRouter.post('/', (request, response, next) => {
    const body = request.body;

    if (!body.title || !body.author || !body.url || !body.likes) {
        return response.status(400).json({ error: 'content missing' });
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    });

    blog.save()
        .then(savedBlog => {
            response.status(201).json(savedBlog);
        })
        .catch(error => next(error));
});

// PUT to update a blog by ID
blogRouter.put('/:id', (request, response, next) => {
    const body = request.body;

    if (!body.title || !body.author || !body.url || !body.likes) {
        return response.status(400).json({ error: 'content missing' });
    }

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    };

    Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
        runValidators: true,
        context: 'query'
    })
        .then(updatedBlog => {
            if (updatedBlog) {
                response.json(updatedBlog);
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error));
});

module.exports = blogRouter;
