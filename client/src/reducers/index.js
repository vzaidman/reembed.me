import {combineReducers} from 'redux'
import * as actions from 'actions'

const defaultState = {
  urlToFetch: '',
  embedFields: {
    title: '',
    description: '',
    url: ''
  }
}

const main = (state = defaultState, action) => {
  switch (action.type) {

    case actions.changeUrlToFetch.TYPE: {
      const urlToFetch = action.payload
      return {
        ...state,
        urlToFetch
      }
    }

    case actions.changeEmbedFields.TYPE: {
      const embedFields = action.payload
      return {
        ...state,
        embedFields
      }
    }

    case actions.updateEmbedFields.TYPE: {
      const embedFields = {
        ...state.embedFields,
        ...action.payload
      }
      return {
        ...state,
        embedFields
      }
    }

    default: {
      return state
    }
  }
}

const rootReducer = combineReducers({
  main
})

export default rootReducer
