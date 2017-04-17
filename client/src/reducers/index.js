import {combineReducers} from 'redux'
import * as types from 'actions/types'

const defaultState = {
  toggled: false
}

const main = (state = defaultState, action) => {
  switch (action.type) {
    case types.TOGGLE:
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
