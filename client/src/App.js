import React from 'react'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  )
}

export default App
