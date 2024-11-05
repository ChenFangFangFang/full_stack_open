const blogRouter = require('express').Router();
const Blog = require('../models/blog');

// GET all blogs
blogRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({});
    response.json(blogs);

});
// Add this route in blogRouter if not present
blogRouter.get('/:id', async (request, response, next) => {

    const blog = await Blog.findById(request.params.id);
    if (blog) {
        response.json(blog);
    } else {
        response.status(404).end();
    }

});


// DELETE a blog by ID
blogRouter.delete('/:id', async (request, response) => {

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()

});

// POST a new blog
blogRouter.post('/', async (request, response, next) => {
    const body = request.body;

    if (!body.title || !body.author || !body.url || !body.likes) {
        return response.status(400).json({ error: 'content missing' });
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    });


    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)

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
        likes: body.likes || 0
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
