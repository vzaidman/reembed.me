import {combineReducers} from 'redux'
import * as actions from 'actions'

const defaultState = {
  toggled: false
}

const main = (state = defaultState, action) => {
  switch (action.type) {
    case actions.toggle.TYPE:
      return {
        ...state,
        toggled: !state.toggled
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  main
})

export default rootReducer
