import * as actions from 'actions'

const defaultState = {
  urlToFetch: '',
  reembedFields: {
    title: '',
    description: '',
    url: '',
    imageUrl: '',
    useUrl: false
  },
  reembeddedUrl: ''
}

export default function main(state = defaultState, action){
  switch (action.type) {

    case actions.changeUrlToFetch.TYPE: {
      const urlToFetch = action.payload
      return {
        ...state,
        urlToFetch,
        reembedFields: {
          ...state.reembedFields,
          url: urlToFetch
        }
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
      return {
        ...state,
        reembedFields: {
          ...state.reembedFields,
          ...action.payload
        }
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