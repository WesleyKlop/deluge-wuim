import 'babel-polyfill'
import React from 'react'
import 'react-mdl/extra/material'
import 'react-mdl/extra/material.css'
import { AppContainer as HMRContainer } from 'react-hot-loader'
import { render } from 'react-dom'
import AppContainer from './containers/AppContainer'
import './main.css'

// For debug reasons
window.log = console.log.bind(console, 'Promise result:') // eslint-disable-line no-console

const appRoot = document.querySelector('#app')

if (process.env.NODE_ENV === 'development' && module.hot) {
  /* eslint-disable */
  render(<HMRContainer><AppContainer /></HMRContainer>, appRoot)

  // HMR
  if (module.hot) {
    module.hot.accept('./containers/AppContainer', () => {
      const AppContainer = require('./containers/AppContainer').default
      render(<HMRContainer><AppContainer /></HMRContainer>)
    })
  }
  /* eslint-enable */
} else {
  render(<AppContainer />, appRoot)
}
