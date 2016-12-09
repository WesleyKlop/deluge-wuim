// @flow
import { combineReducers } from 'redux'
import torrents from './torrents'
import hosts from './hosts'
import searchbar from './searchbarValue'

export default combineReducers({
  searchbarValue: searchbar,
  torrents,
  hosts,
})
