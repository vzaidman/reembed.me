import {makeActionCreator, makeAsyncActionCreator} from 'redux-toolbelt'

export const changeUrlToFetch = makeActionCreator('CHANGE_URL_TO_FETCH')
export const fetchUrl = makeActionCreator('FETCH_URL')

export const changeEmbedFields = makeActionCreator('CHANGE_EMBED_FIELDS')
export const updateEmbedFields = makeActionCreator('UPDATE_EMBED_FIELDS')

export const reembed = makeAsyncActionCreator('REEMBED')
export const changeReembeddedUrl = makeActionCreator('CHANGE_REEMBEDDED_URL')