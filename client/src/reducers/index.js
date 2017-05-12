import {combineReducers} from 'redux'
import * as actions from 'actions'

const defaultState = {
  urlToFetch: '',
  reembedFields: {
    title: '',
    description: '',
    url: '',
    useUrl: false
  },
  reembeddedUrl: ''
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
      const reembedFields = action.payload
      return {
        ...state,
        reembedFields
      }
    }

    case actions.updateEmbedFields.TYPE: {
      const reembedFields = {
        ...state.reembedFields,
        ...action.payload
      }
      return {
        ...state,
        reembedFields
      }
    }

    case actions.changeReembeddedUrl.TYPE: {
      const reembeddedUrl = action.payload
      return {
        ...state,
        reembeddedUrl
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
