import 'babel-polyfill'
import React from 'react'
import 'react-mdl/extra/material'
import 'react-mdl/extra/material.css'
import { AppContainer as HMRContainer } from 'react-hot-loader'
import { render } from 'react-dom'
import DelugeWUIM from './DelugeWUIM'
import Deluge from './api/Deluge'
import { delugeLocation } from '../settings.json'
import createAppStore from './store'
import './main.css'

const appRoot = document.querySelector('#app')
const deluge = new Deluge({ delugeLocation })
const store = createAppStore(deluge)

if (process.env.NODE_ENV === 'development' && module.hot) {
  HMRContainer.displayName = 'HMRContainer'
  /* eslint-disable */
  render(<HMRContainer><DelugeWUIM deluge={deluge} store={store} /></HMRContainer>, appRoot)

  // HMR
  if (module.hot) {
    module.hot.accept('./DelugeWUIM', () => {
      const DelugeWUIM = require('./DelugeWUIM').default
      render(<HMRContainer><DelugeWUIM deluge={deluge} store={store} /></HMRContainer>)
    })
  }

  module.hot.accept('./reducers', () => {
    // eslint-disable-next-line global-require
    const nextRootReducer = require('./reducers/index').default
    store.replaceReducer(nextRootReducer)
  })

  /* eslint-enable */
  if (window) window.deluge = deluge
} else {
  render(<DelugeWUIM deluge={deluge} store={store} />, appRoot)
}
