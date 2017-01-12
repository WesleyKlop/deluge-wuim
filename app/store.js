// @flow
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import Deluge from './lib/Deluge/Deluge'
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

const createAppStore = (deluge: Deluge) => createStore(
  rootReducer,
  defaultState,
  compose(
    applyMiddleware(thunk.withExtraArgument(deluge)),
    // Redux devtools
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
)

export default createAppStore
