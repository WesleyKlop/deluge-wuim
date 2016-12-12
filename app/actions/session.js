// @flow
import type { AppState } from '../api/types'
import Deluge from '../api/Deluge'

export const RECEIVE_SESSION_SPEED = 'RECEIVE_SESSION_SPEED'
export const SHOW_SESSION_SPEED = 'SHOW_SESSION_SPEED'
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED'

export const receiveStats = (download: number, upload: number) => ({
  type: RECEIVE_SESSION_SPEED,
  download,
  upload,
})

export const setShowSessionSpeed = (show: boolean) => ({
  type: SHOW_SESSION_SPEED,
  show,
})

export const setAuthenticated = (authenticated: boolean) => ({
  type: SET_AUTHENTICATED,
  authenticated,
})

export const authenticate = (password: string) =>
  (dispatch: Dispatch, getState: () => AppState, deluge: Deluge) =>
    deluge.auth.login(password).then((success) => {
      dispatch(setAuthenticated(success))
      return success
    })
