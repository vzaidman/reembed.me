import {uniq} from 'lodash'

import * as actions from 'actions'

const defaultState = {
  urlToFetch: '',
  reembedFields: {
    title: '',
    description: '',
    url: '',
    imageUrls: [],
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

    case actions.addImageUrl.TYPE: {
      const newImageUrl = action.payload
      const {imageUrls} = state.reembedFields

      const newImageUrls = uniq([
        newImageUrl,
        ...imageUrls
      ])

      return {
        ...state,
        reembedFields: {
          ...state.reembedFields,
          imageUrls: newImageUrls
        }
      }
    }

    case actions.nextImageUrl.TYPE: {
      const {imageUrls} = state.reembedFields
      if(imageUrls.length < 2){
        return state
      }

      const newImageUrls = [
        ...(imageUrls.slice(1)),
        imageUrls[0]
      ]

      return {
        ...state,
        reembedFields: {
          ...state.reembedFields,
          imageUrls: newImageUrls
        }
      }
    }

    default: {
      return state
    }
  }
}