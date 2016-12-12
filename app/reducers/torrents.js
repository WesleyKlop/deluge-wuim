// @flow
import { RECEIVE_TORRENTS } from '../actions/torrents'

const torrents = (state: Object[] = [], action: Object) => {
  switch (action.type) {
    case RECEIVE_TORRENTS:
      return action.torrents
    default:
      return state
  }
}

export default torrents
