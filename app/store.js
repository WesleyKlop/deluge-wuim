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
}


const createAppStore = (deluge: Deluge) => {
  const middleware = applyMiddleware(thunk.withExtraArgument(deluge))
  // eslint-disable-next-line no-underscore-dangle
  const enhancer = typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function'
    ? compose(
      middleware,
      // Redux devtools
      // eslint-disable-next-line no-underscore-dangle
      typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function' && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ) : middleware

  return createStore(
    rootReducer,
    defaultState,
    enhancer,
  )
}

export default createAppStore
