import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { AppContainer, HomeContainer, LoginContainer, ConnectionManagerContainer } from '../containers'

const Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={HomeContainer} />
      <Route path="login" component={LoginContainer} />
      <Route path="connection" component={ConnectionManagerContainer} />
    </Route>
  </Router>
)

export default Routes
