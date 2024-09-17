import { useState } from "react";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useApolloClient } from "@apollo/client";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => token ? logout() : setPage("login")}>{token ? "logout" : "login"}</button>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <LoginForm setToken={setToken} show={page === "login"} setPage={setPage} />
    </div>
  );
};

export default App;
