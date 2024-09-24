import { useState } from "react";
import { useSubscription, useApolloClient } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";

import { BOOK_ADDED } from "./queries";
import { updateCache } from "./utilities";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const newBook = data.data.bookAdded;

      console.log('newBook :>> ', newBook);
      window.alert(`New book added: ${newBook.title}`);

      updateCache(client.cache, newBook);
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommendations")}>recommendations</button>
        <button onClick={() => token ? logout() : setPage("login")}>{token ? "logout" : "login"}</button>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommendations show={page === "recommendations"} />

      <LoginForm setToken={setToken} show={page === "login"} setPage={setPage} />
    </div>
  );
};

export default App;
