// @flow
import { combineReducers } from 'redux'
import torrents from './torrents'
import hosts from './hosts'
import searchbar from './searchbarValue'
import session from './session'

export default combineReducers({
  searchbarValue: searchbar,
  torrents,
  hosts,
  session,
})
