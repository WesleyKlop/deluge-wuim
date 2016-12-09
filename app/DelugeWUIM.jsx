// @flow
import React, { Component, PropTypes } from 'react'
import { BrowserRouter } from 'react-router'
import Helmet from 'react-helmet'
import { Provider } from 'react-redux'
import { delugeLocation, basename } from '../settings.json'
import Deluge from './api/Deluge'
import AppContainer from './containers/AppContainer'
import store from './store'

class DelugeWUIM extends Component {

  static childContextTypes = {
    deluge: PropTypes.instanceOf(Deluge),
  }

  constructor() {
    super()

    this.deluge = new Deluge({ delugeLocation })

    if (window && process.env.NODE_ENV === 'development') {
      window.deluge = this.deluge
    }
  }

  getChildContext() {
    return {
      deluge: this.deluge,
    }
  }

  deluge: Deluge
  router: BrowserRouter

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter basename={basename} ref={e => (this.router = e)} >
          <AppContainer>
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
