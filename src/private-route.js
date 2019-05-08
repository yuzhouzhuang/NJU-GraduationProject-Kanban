import React from 'react'
import { Route, Redirect } from 'react-router-dom'

/**
 * https://reacttraining.com/react-router/web/example/auth-workflow
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('user')
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
)

export default PrivateRoute
