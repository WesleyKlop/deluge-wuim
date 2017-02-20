// @flow
import React from 'react'
import { Route } from 'react-router-dom'
import RequireAuth from '../containers/RequireAuth'

const AuthRoute = (props: Object) => (
  <RequireAuth>
    <Route {...props} />
  </RequireAuth>
)

export default AuthRoute
