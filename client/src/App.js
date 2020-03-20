import React, { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/layout/Alert'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/profileForms/CreateProfile'
import EditProfile from './components/profileForms/EditProfile'
import ProtectedRoute from './components/routing/ProtectedRoute'
import AddEducation from './components/profileForms/AddEducation'
import AddExperience from './components/profileForms/AddExperience'
import Profiles from './components/profiles/Profiles'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Profile from './components/profile/Profile'
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
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:id" component={Profile} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
            <ProtectedRoute
              exact
              path="/edit-profile"
              component={EditProfile}
            />
            <ProtectedRoute
              exact
              path="/add-education"
              component={AddEducation}
            />
            <ProtectedRoute
              exact
              path="/add-experience"
              component={AddExperience}
            />
            <ProtectedRoute exact path="/posts" component={Posts} />
            <ProtectedRoute exact path="/posts/:id" component={Post} />
          </Switch>
        </section>
      </Router>
    </Provider>
  )
}

export default App
