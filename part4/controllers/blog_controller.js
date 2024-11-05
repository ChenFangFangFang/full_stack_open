const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user')
// GET all blogs
blogRouter.get('/', async (request, response) => {

    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs);

});
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
    const user = await User.findById(body.userId)
    if (!body.title || !body.author || !body.url || !body.likes) {
        return response.status(400).json({ error: 'content missing' });
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id

    });

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)

});

// PUT to update a blog by ID
blogRouter.put('/:id', (request, response, next) => {
    const { likes } = request.body;

    if (likes === undefined) {
        return response.status(400).json({ error: 'likes filed is missing' })
    }


    Blog.findByIdAndUpdate(request.params.id, { $set: { likes } }, {
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
