// @flow
import React, { Component, PropTypes } from 'react'
import { BrowserRouter } from 'react-router'
import Helmet from 'react-helmet'
import { Provider } from 'react-redux'
import manifestUrl from './assets/manifest.json'
import { basename } from '../settings.json'
import Deluge from './lib/Deluge'
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
        <BrowserRouter basename={basename.slice(0, -1)} ref={e => (this.router = e)}>
          <AppContainer deluge={this.props.deluge}>
            <Helmet
              titleTemplate="%s - Deluge"
              defaultTitle="Deluge WUIM"
              link={[
                { rel: 'manifest', href: manifestUrl },
              ]}
            />
          </AppContainer>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default DelugeWUIM
