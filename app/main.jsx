import React from 'react'
import { render } from 'react-dom'
import Routes from './Routes'

const appRoot = document.querySelector('#app')

if (process.env.NODE_ENV === 'development') {
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
