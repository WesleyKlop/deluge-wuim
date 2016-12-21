import React from 'react'
import { Match } from 'react-router'
import RequireAuth from './RequireAuth'

const AuthMatch = props => (
  <RequireAuth>
    <Match {...props} />
  </RequireAuth>
)

export default AuthMatch
