// @flow
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import Deluge from './lib/Deluge'
import type { AppState } from './lib/Deluge/types'

const defaultState: AppState = {
  torrents: [],
  hosts: [],
  searchbarValue: '',
  session: {
    download: 0,
    upload: 0,
    showSessionSpeed: false,
    authenticated: false,
    selectedTorrent: null,
  },
  ui: {
    title: 'Deluge WUIM',
  },
}

const createAppStore = (deluge: Deluge): Store => {
  let enhancer = applyMiddleware(thunk.withExtraArgument(deluge))
  // eslint-disable-next-line no-underscore-dangle
  if (typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function') {
    enhancer = compose(
      enhancer,
      // eslint-disable-next-line no-underscore-dangle
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
  }

  return createStore(
    rootReducer,
    defaultState,
    enhancer,
  )
}

export default createAppStore
