// src/App.js
import React, { useState, useEffect } from 'react'
import LandingPage from './LandingPage'
import Header from './Header'
import Home from './Home'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});


function App() {
    const storedJwt = localStorage.getItem('token');
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