const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.startsWith('Bearer ')) {
//         return authorization.replace('Bearer ', '')
//     }
//     return null
// }
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
    const body = request.body;
    try {
        if (!request.token) {
            return response.status(401).json({ error: 'token invalid' })
        }
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }

        const blog = await Blog.findById(request.params.id)
        if (!blog) {
            return response.status(404).json({ error: 'blog not found' });

        }
        if (blog.user.toString() !== decodedToken.id) {
            return response.status(403).json({ error: 'only the creator can delete this blog' });
        }
        await Blog.findByIdAndDelete(request.params.id);
        response.status(204).end();
    } catch (error) {
        next(error)
    }


});

// POST a new blog
blogRouter.post('/', async (request, response, next) => {
    const body = request.body;
    try {
        if (!request.token) {
            return response.status(401).json({ error: 'token invalid' })
        }
        console.log("Token:", request.token);
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        console.log("Decoded Token:", decodedToken);  // Log the decoded token

        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }
        const user = await User.findById(decodedToken.id)

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

    } catch (error) {
        next(error)
    }






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
