import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Routes from './Routes'
import Deluge from './api'

window.deluge = new Deluge({ delugeLocation: 'https://app.wesleyklop.nl/deluge' })
window.log = console.log.bind(console, 'Promise result:') // eslint-disable-line no-console

const appRoot = document.querySelector('#app')

if (process.env.NODE_ENV === 'development' && module.hot) {
  /* eslint-disable */
  const { AppContainer } = require('react-hot-loader')

  render(<AppContainer>{Routes}</AppContainer>, appRoot)

  // HMR
  if (module.hot) {
    module.hot.accept('./Routes.jsx', () => {
      const Routes = require('./Routes.jsx').default
      render(<AppContainer>{Routes}</AppContainer>)
    })
  }
  /* eslint-enable */
} else {
  render(Routes, appRoot)
}
