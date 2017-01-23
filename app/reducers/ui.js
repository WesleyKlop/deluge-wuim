// @flow
import { SET_TITLE } from '../actions/ui'

type State = {
  title: string,
}

const initialState: State = {
  title: 'Deluge WUIM',
}

const ui = (state: State = initialState, action: Object): State => {
  switch (action.type) {
    case SET_TITLE:
      return {
        ...state,
        title: action.title,
      }
    default:
      return state
  }
}

export default ui
