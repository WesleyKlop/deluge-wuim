// @flow
import { RECEIVE_SESSION_SPEED, SHOW_SESSION_SPEED, SET_AUTHENTICATED } from '../actions/session'

type State = {
  download: number,
  upload: number,
  showSessionSpeed: boolean,
  authenticated: boolean,
}

const defaultState: State = {
  download: 0,
  upload: 0,
  showSessionSpeed: false,
  authenticated: false,
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
    default:
      return state
  }
}

export default session
