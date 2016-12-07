import 'babel-polyfill'
import React from 'react'
import 'react-mdl/extra/material'
import 'react-mdl/extra/material.css'
import { AppContainer as HMRContainer } from 'react-hot-loader'
import { render } from 'react-dom'
import DelugeWUIM from './DelugeWUIM'
import './main.css'

const appRoot = document.querySelector('#app')

if (process.env.NODE_ENV === 'development' && module.hot) {
  HMRContainer.displayName = 'HMRContainer'
  /* eslint-disable */
  render(<HMRContainer><DelugeWUIM /></HMRContainer>, appRoot)

  // HMR
  if (module.hot) {
    module.hot.accept('./DelugeWUIM', () => {
      const DelugeWUIM = require('./DelugeWUIM').default
      render(<HMRContainer><DelugeWUIM /></HMRContainer>)
    })
  }
  /* eslint-enable */
} else {
  render(<DelugeWUIM />, appRoot)
}
