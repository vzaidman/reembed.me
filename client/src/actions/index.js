import {makeActionCreator, makeAsyncActionCreator} from 'redux-toolbelt'

export const changeUrlToFetch = makeActionCreator('CHANGE_URL_TO_FETCH')
export const fetchUrl = makeActionCreator('FETCH_URL')
export const urlFetchFailed = makeActionCreator('URL_FETCH_FAILED')

export const changeEmbedFields = makeActionCreator('CHANGE_EMBED_FIELDS')
export const updateEmbedFields = makeActionCreator('UPDATE_EMBED_FIELDS')

export const reembed = makeAsyncActionCreator('REEMBED')
export const updateReembeddedUrl = makeActionCreator('UPDATE_REEMBEDDED_URL')
export const reembedFailed = makeActionCreator('REEMBED_FAILED')