// @flow
import React from 'react'
import 'react-mdl/extra/material'
import 'react-mdl/extra/material.css'
import { AppContainer as HMRContainer } from 'react-hot-loader'
import { render } from 'react-dom'
import runtime from 'serviceworker-webpack-plugin/lib/runtime'
import DelugeWUIM from './DelugeWUIM'
import Deluge from './lib/Deluge'
import { delugeLocation } from '../settings.json'
import createAppStore from './store'
import './main.css'
import './assets/deluge.png'

const appRoot = document.querySelector('#app')
const deluge = new Deluge({ delugeLocation })
const store = createAppStore(deluge)

const renderApp = (App: any) => render(
  <HMRContainer>
    <App deluge={deluge} store={store} />
  </HMRContainer>,
  appRoot,
)

renderApp(DelugeWUIM)

if (module.hot) {
  HMRContainer.displayName = 'HMRContainer'
  module.hot.accept('./DelugeWUIM', () => {
    renderApp(DelugeWUIM)
  })

  module.hot.accept('./reducers', () => {
    // eslint-disable-next-line global-require
    const nextRootReducer = require('./reducers/index').default
    store.replaceReducer(nextRootReducer)
  })

  if (typeof window === 'object') {
    window.deluge = deluge
  }
}

if ('serviceWorker' in navigator) {
  runtime.register()
}
