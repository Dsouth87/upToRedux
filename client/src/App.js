import React, { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/layout/Alert'
import Dashboard from './components/dashboard/Dashboard'
import ProtectedRoute from './components/routing/ProtectedRoute'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// redux
import { Provider } from 'react-redux'
import store from './store'
import './App.css'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Alert />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
