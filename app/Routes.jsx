import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { AppContainer, HomeContainer } from './containers'

const Routes = (
  <Router history={browserHistory}>
    <Route path="/deluge-web/" component={AppContainer}>
      <IndexRoute component={HomeContainer} />
    </Route>
  </Router>
)

export default Routes
