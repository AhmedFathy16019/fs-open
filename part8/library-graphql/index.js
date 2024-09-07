const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
*/

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    bookCount: Int
    born: Int
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    dummy: Int
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Author: {
    bookCount: async ({ _id }) => {
      return Book.countDocuments({ author: _id });
    }
  },

  Query: {
    dummy: () => 0,
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    
    allBooks: async (root, args) => {
      if (Object.keys(args).length === 0) {
        return Book.find({})
      }

      let retBooks = [];
      if (args.author) {
        const author = await Author.findOne({ name: args.author });

        if (!author) {
          return [];
        } else {
          retBooks = await Book.find({ author: author._id }).populate('author');
        }
      }

      if (args.genre) {
        retBooks = await Book.find({genres: args.genre}).populate('author');
      }

      return retBooks
    },

    allAuthors: async () => {
      return Author.find({});
    },

    me: async (root, args, { currentUser }) => currentUser,
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('UNAUTHORIZED', {
          extensions: {
            code: "UNAUTHORIZED",
            error: "You must be logged in to perform this action"
          }
        })
      }

      const { author, ...rest } = args;
      let authorRef = await Author.findOne({ name: author });

      if (!authorRef) {
        authorRef = new Author({ name: author });
        
        try {
          await authorRef.save();
        } catch (error) {
          throw new GraphQLError('Author Does not Exist, an error occurred creating it', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          });
        }
      }

      const newBook = new Book({ ...rest, author: authorRef._id });
      try {
        await newBook.save();
        await newBook.populate('author');
      } catch (error) {
        throw new GraphQLError('An error occurred creating the book', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        });
      }

      return newBook;
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('UNAUTHORIZED', {
          extensions: {
            code: "UNAUTHORIZED",
            error: "You must be logged in to perform this action"
          }
        })
      }

      return await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      );
    },

    createUser: async (root, args) => {
      const userExists = await User.findOne({ username: args.username });
      if (userExists) {
        throw new GraphQLError('Username already exists', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
          }
        });
      }

      const newUser = new User({ ...args });

      try {
        await newUser.save();
      } catch(error) {
        throw new GraphQLError('An error occurred creating the user', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      }

      return newUser;
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'dedSec') {
        throw new GraphQLError('Invalid username or password', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
          }
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);

      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})