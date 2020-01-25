import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Log In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign Into Your Account
        </p>
        <form className="form" action="create-profile.html">
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
            />
          </div>

          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </section>
    </Fragment>
  )
}

export default Login
