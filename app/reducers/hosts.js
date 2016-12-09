// @flow
import type { Host } from '../api/types'

type State = Host[]

const hosts = (state: State = [], action: Object): State => {
  switch (action.type) {
    default:
      return state
  }
}

export default hosts
