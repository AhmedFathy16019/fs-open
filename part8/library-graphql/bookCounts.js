const book = require('./models/book');
const Book = require('./models/book');

let bookCounts = null;

const fetchBookCounts = async () => {
    const tempCounts = await Book.aggregate([
        { $group: { _id: '$author', count: { $sum: 1 } } }
    ]);
    
    bookCounts = tempCounts.reduce((acc, { _id, count }) => {
        acc[_id] = count;
        return acc;
    }, {});
};

fetchBookCounts();

const getBookCounts = async () => {
    return bookCounts;
};

module.exports = { getBookCounts };
