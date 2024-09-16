import { useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import { ALL_PERSONS } from './queries';
import Persons from './components/persons';
import PersonForm from './components/personForm';
import Notify from './components/notify';
import PhoneForm from './components/phoneForm';
import LoginForm from './components/loginForm';

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const result = useQuery(ALL_PERSONS);
  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  }

  const logout = () => {
    setToken(null);

    localStorage.clear();
    client.resetStore();
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    )
  }

  if (result.loading) {
    return <div>loading ...</div>
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  )
}

export default App;
