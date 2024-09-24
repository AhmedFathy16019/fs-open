import { ALL_BOOKS } from "./queries";

export const updateCache = (store, newBook) => {
    const uniqByTitle = (books) => {
        let seen = new Set();

        return books.filter((book) => {
            let title = book.title;
            return seen.has(title) ? false : seen.add(title);
        })
    };

    const dataInStore = store.readQuery({ query: ALL_BOOKS });

    store.writeQuery({
        query: ALL_BOOKS,
        data: {
            allBooks: uniqByTitle(dataInStore.allBooks.concat(newBook))
        }
    });

    newBook.genres.forEach(genre => {
        const dataInStore = store.readQuery({ query: ALL_BOOKS, variables: { genre }});

        if (!dataInStore) {
            return;
        }

        store.writeQuery({
            query: ALL_BOOKS,
            variables: { genre },
            data: {
                allBooks: uniqByTitle(dataInStore.allBooks.concat(newBook))
            }
        });
    });
};
  