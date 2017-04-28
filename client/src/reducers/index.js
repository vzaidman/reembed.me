import {combineReducers} from 'redux'
import * as actions from 'actions'

const defaultState = {
  urlToFetch: false
}

const main = (state = defaultState, action) => {
  switch (action.type) {
    case actions.changeURLToFetch.TYPE:
      return {
        urlToFetch: action.payload,
        ...state
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  main
})

export default rootReducer
