// @flow
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const defaultState = {
  torrents: [],
  hosts: [],
  searchbarValue: '',
}

const enhancers = compose(
  applyMiddleware(thunk),
  // Redux devtools
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

const store = createStore(
  rootReducer,
  defaultState,
  enhancers,
)

if (module.hot) {
  module.hot.accept('./reducers', () => {
    // eslint-disable-next-line global-require
    const nextRootReducer = require('./reducers/index').default
    store.replaceReducer(nextRootReducer)
  })
}

window.store = store

export default store
