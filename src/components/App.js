// src/App.js
import React, { useState, useEffect } from 'react'
import LandingPage from './LandingPage'
import Header from './Header'
import Home from './Home'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute'
import { ApolloClient, createHttpLink, ApolloProvider, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
    // const [jwt, setJwt] = useState(storedJwt || null);
    // const [user, setUser] = useState(null);
    // const [loginError, setLoginError] = useState(null);
    // const [authState, setAuthState] = useState(null);

    return (
      <ApolloProvider client={client}>
        <div>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path="/login" component={LandingPage} />
              <ProtectedRoute exact={true} path="/" component={Home}/>
              <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
          </BrowserRouter>
        </div>
      </ApolloProvider>
    )
}

export default App