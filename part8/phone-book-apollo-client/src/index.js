import ReactDOM from 'react-dom/client';
import App from './App';

import {
  ApolloClient,
  split,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('phonenumbers-user-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const wsLink = new GraphQLWsLink(
  createClient({ url: 'ws://localhost:4000' })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
);


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

const query = gql`
  query{
    allPersons{
      name,
      phone,
      address {
        street,
        city
      }
      id
    }
  }
`

client.query({ query }).then((response) => { console.log(response.data) });

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
