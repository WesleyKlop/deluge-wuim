// @flow
import React, { Component, PropTypes } from 'react'
import { BrowserRouter } from 'react-router'
import Helmet from 'react-helmet'
import { Provider } from 'react-redux'
import { basename } from '../settings.json'
import Deluge from './lib/Deluge/Deluge'
import AppContainer from './containers/AppContainer'

class DelugeWUIM extends Component {

  static childContextTypes = {
    deluge: PropTypes.instanceOf(Deluge),
  }

  getChildContext() {
    return {
      deluge: this.props.deluge,
    }
  }

  props: {
    deluge: Deluge,
    store: Store,
  }
  router: BrowserRouter

  render() {
    return (
      <Provider store={this.props.store}>
        <BrowserRouter basename={basename} ref={e => (this.router = e)} >
          <AppContainer deluge={this.props.deluge}>
            <Helmet
              titleTemplate="%s - Deluge"
              defaultTitle="Deluge WUIM"
            />
          </AppContainer>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default DelugeWUIM
