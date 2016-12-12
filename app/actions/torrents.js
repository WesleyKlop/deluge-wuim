// @flow
import type { Torrent, AppState } from '../api/types'
import Deluge from '../api/Deluge'
import { receiveStats } from './session'

export const REQUEST_TORRENTS = 'REQUEST_TORRENTS'
export const RECEIVE_TORRENTS = 'RECEIVE_TORRENTS'

export const requestTorrents = () => ({
  type: REQUEST_TORRENTS,
})

export const receiveTorrents = (torrents: Torrent[]) => ({
  type: RECEIVE_TORRENTS,
  torrents,
})

export const fetchTorrents = () =>
  (dispatch: Dispatch, getState: () => AppState, deluge: Deluge) => {
    dispatch(requestTorrents())
    return deluge.web.updateUi(['hash', 'name', 'eta', 'label', 'ratio', 'state', 'download_rate', 'progress', 'total_done', 'total_wanted', 'upload_rate'])
      .then((data) => {
        const { download_rate, upload_rate } = data.stats
        dispatch(receiveStats(download_rate, upload_rate))
        return Object.values(data.torrents)
      })
      .then((torrents: Torrent[]) => {
        dispatch(receiveTorrents(torrents))
      })
  }
