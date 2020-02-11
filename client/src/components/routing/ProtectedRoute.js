import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const ProtectedRoute = ({
  component: Component,
  auth: { isAuthorized, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !loading && !isAuthorized ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
)

ProtectedRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(ProtectedRoute)
