// @flow
import { CHANGE_SEARCH_VALUE } from '../actions/searchbarValue'

type State = string

const searchbarValue = (state: State = '', action: Object): State => {
  switch (action.type) {
    case CHANGE_SEARCH_VALUE:
      return action.value
    default:
      return state
  }
}

export default searchbarValue
