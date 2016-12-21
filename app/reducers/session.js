// @flow
import { RECEIVE_SESSION_SPEED, SHOW_SESSION_SPEED, SET_AUTHENTICATED, RECEIVE_TORRENT_DETAILS } from '../actions/session'
import type { Torrent } from '../api/types'

type State = {
  download: number,
  upload: number,
  showSessionSpeed: boolean,
  authenticated: boolean,
  selectedTorrent: ?Torrent,
}

const defaultState: State = {
  download: 0,
  upload: 0,
  showSessionSpeed: false,
  authenticated: false,
  selectedTorrent: null,
}

const session = (state: State = defaultState, action: Object) => {
  switch (action.type) {
    case RECEIVE_SESSION_SPEED:
      return Object.assign({}, state, {
        download: action.download,
        upload: action.upload,
      })
    case SHOW_SESSION_SPEED:
      return Object.assign({}, state, {
        showSessionSpeed: action.show,
      })
    case SET_AUTHENTICATED:
      return Object.assign({}, state, {
        authenticated: action.authenticated,
      })
    case RECEIVE_TORRENT_DETAILS:
      return Object.assign({}, state, {
        selectedTorrent: action.torrent,
      })
    default:
      return state
  }
}

export default session
