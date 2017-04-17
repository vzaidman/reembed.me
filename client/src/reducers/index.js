import {combineReducers} from 'redux'
import * as types from 'actions/types'

const main = (state = false, action) => {
  switch (action.type) {
    case types.TOGGLE:
      return !state
    default:
      return state
  }
}

const rootReducer = combineReducers({
  main
})

export default rootReducer
