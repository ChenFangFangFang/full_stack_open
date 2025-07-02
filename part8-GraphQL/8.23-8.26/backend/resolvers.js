const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const resolvers = {
  Book: {
    author: async (root) => {
      console.log('Fetching author for book:', root.title)
      return await Author.findById(root.author)
    }
  },
  Author: {
    bookCount: async (root) => {
      console.log('Getting bookCount for author:', root.name)
      return root.bookCount || 0
    }
  },
  Query: {
    bookCount: async () => {
      console.log('Counting all books')
      return await Book.countDocuments()
    },
    authorCount: async () => {
      console.log('Counting all authors')
      return await Author.countDocuments()
    },
    allBooks: async (root, args) => {
      console.log('Fetching books with args:', args)
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) return []
        return await Book.find({ author: author._id }).populate('author')
      }
      if (args.genre) {
        return await Book.find({ genres: { $in: [args.genre] } }).populate('author')
      }
      return await Book.find({}).populate('author')
    },
    findBooksByAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      if (!author) return []
      return await Book.find({ author: author._id }).populate('author')
    },
    findBooksByGenre: async (root, args) => {
      return await Book.find({ genres: { $in: [args.genre] } }).populate('author')
    },
    allAuthors: async () => {
      console.log('Starting allAuthors query with aggregation')
      console.time('allAuthors')
      // 使用聚合管道一次性获取所有作者及其书籍数量
      const authors = await Author.aggregate([
        {
          $lookup: {
            from: 'books',
            localField: '_id',
            foreignField: 'author',
            as: 'books'
          }
        },
        {
          $addFields: {
            bookCount: { $size: '$books' }
          }
        },
        {
          $project: {
            _id: 1,
            name: 1,
            born: 1,
            bookCount: 1
          }
        }
      ])
      console.timeEnd('allAuthors')
      console.log(`Fetched ${authors.length} authors in a single query`)
      return authors
    },
    me: async (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      // 首先查找或创建作者
      console.log('context:', context)
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Creating author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error: error.message,
            },
          })
        }
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres
      })
      
      try {
        await book.save()
        const populatedBook = await Book.findById(book._id).populate('author')
        pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })
        return populatedBook
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error: error.message,
          },
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      
      author.born = args.setBornTo
      
      try {
        await author.save()
        return author
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error: error.message,
          },
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username })
  
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },

  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },

}
module.exports = resolvers