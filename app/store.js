// @flow
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import Deluge from './api/Deluge'
import type { AppState } from './api/types'

const defaultState: AppState = {
  torrents: [],
  hosts: [],
  searchbarValue: '',
}

const createAppStore = (deluge: Deluge): Store => createStore(
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
