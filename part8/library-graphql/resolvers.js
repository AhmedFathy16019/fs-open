const { PubSub } = require('graphql-subscriptions')
const { GraphQLError, subscribe } = require('graphql')
const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { getBookCounts } = require('./bookCounts')

const pubsub = new PubSub();



const resolvers = {
    Author: {
        bookCount: async ({ _id }) => {
            const bookCounts = await getBookCounts();

            return bookCounts[_id] || 0;
        },
        id: ({ _id }) => _id,
    },

    Query: {
        dummy: () => 0,
        bookCount: async () => Book.countDocuments(),
        authorCount: async () => Author.countDocuments(),
        
        allBooks: async (root, args) => {
            if (Object.keys(args).length === 0) {
                return Book.find({}).populate('author');
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

            pubsub.publish('BOOK_ADDED', { bookAdded: newBook });
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

            const updatedAuthor = await Author.findOneAndUpdate(
                { name: args.name },
                { born: args.setBornTo },
                { new: true }
            );

            return updatedAuthor;
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
                favoriteGenre: user.favoriteGenre,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
    },
}

module.exports = resolvers