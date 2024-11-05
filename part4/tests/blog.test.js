const { test, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const assert = require('node:assert');
const Blog = require('../models/blog');
const api = supertest(app);
const helper = require('../utils/test_helper')


beforeEach(async () => {
    await Blog.deleteMany({});
    // await Blog.insertMany(helper.initialBlogs);
    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blog')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blog')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})


test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blog')
    const title = response.body.map(r => r.title)
    assert(title.includes('Type wars'))
})

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: "NEW BLOG",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }

    await api
        .post('/api/blog')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogAtEnd = await helper.blogInDb()
    assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length + 1)

    const title = blogAtEnd.map(r => r.title)
    assert(title.includes('NEW BLOG'))
})

test('blog without content is not added', async () => {
    const newBlog = {
        title: "non"
    }

    await api
        .post('/api/blog')
        .send(newBlog)
        .expect(400)

    const blogAtEnd = await helper.blogInDb()

    assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length)
})

test('a specific blog can be viewed', async () => {
    const blogAtStart = await helper.blogInDb()
    const blogToView = blogAtStart[0]

    const resultBlog = await api
        .get(`/api/blog/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    assert.deepStrictEqual(resultBlog.body, blogToView)
})

test('a blog can be deleted', async () => {
    const blogAtStart = await helper.blogInDb()
    const blogToDelete = blogAtStart[0]
    await api
        .delete(`/api/blog/${blogToDelete.id}`)
        .expect(204)
    const blogAtEnd = await helper.blogInDb()
    const title = blogAtEnd.map(r => r.title)
    assert(!title.includes(blogToDelete.title))

    assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length - 1)
})
after(async () => {
    await mongoose.connection.close()
})