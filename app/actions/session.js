// @flow
import type { AppState, Torrent } from '../lib/types'
import Deluge from '../lib/Deluge/Deluge'

export const RECEIVE_SESSION_SPEED = 'RECEIVE_SESSION_SPEED'
export const SHOW_SESSION_SPEED = 'SHOW_SESSION_SPEED'
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED'
export const REQUEST_TORRENT_DETAILS = 'REQUEST_TORRENT_DETAILS'
export const RECEIVE_TORRENT_DETAILS = 'RECEIVE_TORRENT_DETAILS'

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

export const requestTorrentDetails = (torrentId: string) => ({
  type: REQUEST_TORRENT_DETAILS,
  torrentId,
})

export const receiveTorrentDetails = (torrent: ?Torrent) => ({
  type: RECEIVE_TORRENT_DETAILS,
  torrent,
})

export const fetchTorrentDetails = (torrentId: string) =>
  (dispatch: Dispatch, getState: () => AppState, deluge: Deluge) => {
    dispatch(requestTorrentDetails(torrentId))
    return deluge.web.getTorrentStatus(torrentId)
      .then((torrent: Torrent) => {
        dispatch(receiveTorrentDetails(torrent))
      })
  }
