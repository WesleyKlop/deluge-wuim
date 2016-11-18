import 'babel-polyfill'
import React from 'react'
import 'react-mdl/extra/material'
import 'react-mdl/extra/material.css'
import { render } from 'react-dom'
import Routes from './components/Routes'
import './main.css'

// For debug reasons
window.log = console.log.bind(console, 'Promise result:') // eslint-disable-line no-console

const appRoot = document.querySelector('#app')

if (process.env.NODE_ENV === 'development' && module.hot) {
  /* eslint-disable */
  const { AppContainer: HMRContainer } = require('react-hot-loader')

  render(<HMRContainer>{Routes}</HMRContainer>, appRoot)

  // HMR
  if (module.hot) {
    module.hot.accept('./components/Routes', () => {
      const Routes = require('./components/Routes').default
      render(<HMRContainer>{Routes}</HMRContainer>)
    })
  }
  /* eslint-enable */
} else {
  render(Routes, appRoot)
}
