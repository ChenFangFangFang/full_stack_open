const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const emptyList = []

    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ]

    const listWithMultipleBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Another Blog',
            author: 'Author Two',
            url: 'https://example.com/blog2',
            likes: 10,
            __v: 0
        },
        {
            _id: '5a422bc61b54a676234d17fa',
            title: 'Yet Another Blog',
            author: 'Author Three',
            url: 'https://example.com/blog3',
            likes: 15,
            __v: 0
        }
    ]

    test('when list is empty, equals 0', () => {
        const result = listHelper.totalLikes(emptyList)
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog, equals the likes of that blog', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('when list has multiple blogs, equals the sum of all likes', () => {
        const result = listHelper.totalLikes(listWithMultipleBlogs)
        assert.strictEqual(result, 30)
    })
})
