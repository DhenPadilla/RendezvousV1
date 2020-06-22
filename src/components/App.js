// src/App.js
import React from 'react'
import LandingPage from './LandingPage'
import Header from './Header'
import Home from './Home'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute'


function App() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/login" component={LandingPage} />
            <ProtectedRoute exact path="/" component={Home} />
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </BrowserRouter>
      </div>
    )
}

export default App