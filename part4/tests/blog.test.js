const { test, after, beforeEach, describe } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const assert = require('node:assert');
const api = supertest(app);
const bcrypt = require('bcrypt')

const helper = require('../utils/test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken');

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({});
        await Blog.insertMany(helper.initialBlogs);
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('testpassword', 10);
        const user = new User({ username: 'testuser', passwordHash });
        await user.save();
    })

    test('blogs are returned as json', async () => {
        const loginResponse = await api
            .post('/api/login')
            .send({ username: 'testuser', password: 'testpassword' });

        const token = loginResponse.body.token; // Assume the token is returned in login response

        await api
            .get('/api/blog')
            .set('Authorization', `Bearer ${token}`)  // Set the token in Authorization header
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const loginResponse = await api
            .post('/api/login')
            .send({ username: 'testuser', password: 'testpassword' });

        const token = loginResponse.body.token;
        const response = await api
            .get('/api/blog')
            .set('Authorization', `Bearer ${token}`)  // Include token
            .expect(200)
            .expect('Content-Type', /application\/json/);

        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const loginResponse = await api
            .post('/api/login')
            .send({ username: 'testuser', password: 'testpassword' });

        const token = loginResponse.body.token;
        const response = await api
            .get('/api/blog')
            .set('Authorization', `Bearer ${token}`)  // Include token
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const title = response.body.map(r => r.title)
        assert(title.includes('Type wars'))
    })

    test('a valid blog can be added ', async () => {
        const loginResponse = await api
            .post('/api/login')
            .send({ username: 'testuser', password: 'testpassword' });

        const token = loginResponse.body.token;

        const newBlog = {
            title: "NEW BLOG",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
        }

        await api
            .post('/api/blog')
            .set('Authorization', `Bearer ${token}`)  // Include token
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);


        const blogAtEnd = await helper.blogInDb()
        assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length + 1)

        const title = blogAtEnd.map(r => r.title)
        assert(title.includes('NEW BLOG'))
    })

    test('a blog without auth can not be added ', async () => {
        const newBlog = {
            title: "NEW BLOG",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
        }

        await api
            .post('/api/blog')
            .send(newBlog)
            .expect(401)


        const blogAtEnd = await helper.blogInDb()
        assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length)

        const title = blogAtEnd.map(r => r.title)
        assert(!title.includes('NEW BLOG'))
    })

    test('blog without content is not added', async () => {
        const loginResponse = await api
            .post('/api/login')
            .send({ username: 'testuser', password: 'testpassword' });

        const token = loginResponse.body.token;

        const newBlog = {
            title: "non"
        }

        await api
            .post('/api/blog')
            .set('Authorization', `Bearer ${token}`)  // Include token
            .send(newBlog)
            .expect(400)



        const blogAtEnd = await helper.blogInDb()

        assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length)
    })

    test('a specific blog can be viewed', async () => {
        const loginResponse = await api
            .post('/api/login')
            .send({ username: 'testuser', password: 'testpassword' });

        const token = loginResponse.body.token;

        const blogAtStart = await helper.blogInDb()
        const blogToView = blogAtStart[0]

        const resultBlog = await api
            .get(`/api/blog/${blogToView.id}`)
            .set('Authorization', `Bearer ${token}`)  // Include token
            .expect(200)
            .expect('Content-Type', /application\/json/)
        assert.deepStrictEqual(resultBlog.body, blogToView)
    })

    test('a blog can be deleted', async () => {
        // Log in to get the token
        const loginResponse = await api
            .post('/api/login')
            .send({ username: 'testuser', password: 'testpassword' });

        const token = loginResponse.body.token;
        console.log("Token:", token);  // Log the token to verify it's correctly retrieved

        // Create a new blog that the test user owns
        const newBlog = {
            title: "Blog to Delete",
            author: "Author Name",
            url: "http://example.com",
            likes: 0,
        };

        const createResponse = await api
            .post('/api/blog')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201);

        const blogToDelete = createResponse.body; // Get the created blog
        console.log("Created blog ID:", blogToDelete.id); // Log the blog ID

        // Verify that the blog count is as expected before deletion
        const blogAtStart = await helper.blogInDb();
        console.log("Blog count before deletion:", blogAtStart.length);

        // Delete the blog
        await api
            .delete(`/api/blog/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)  // Include token
            .expect(204);

        // Fetch blogs after deletion to verify
        const blogAtEnd = await helper.blogInDb();
        const titles = blogAtEnd.map(r => r.title);
        assert(!titles.includes(blogToDelete.title));

        // Check that the total count of blogs is one less
        console.log("Blog count after deletion:", blogAtEnd.length);
        assert.strictEqual(blogAtEnd.length, blogAtStart.length - 1);
    });


})
after(async () => {
    await mongoose.connection.close()
})