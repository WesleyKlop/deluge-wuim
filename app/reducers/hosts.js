// @flow
import type { Host } from '../lib/Deluge/types'
import { RECEIVE_HOSTS, RECEIVE_HOST_STATUS } from '../actions/hosts'

type State = Host[]

const hosts = (state: State = [], action: Object): State => {
  switch (action.type) {
    case RECEIVE_HOSTS:
      return action.hosts
    case RECEIVE_HOST_STATUS: {
      const hostIndex = state.findIndex(host => action.host.id === host.id)
      return [
        ...state.slice(0, hostIndex),
        action.host,
        ...state.slice(hostIndex + 1),
      ]
    }
    default:
      return state
  }
}

export default hosts
