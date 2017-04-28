import {makeActionCreator, makeAsyncActionCreator} from 'redux-toolbelt'

export const changeUrlToFetch = makeActionCreator('CHANGE_URL_TO_FETCH')

export const changeEmbedFields = makeActionCreator('CHANGE_EMBED_FIELDS')

export const updateEmbedFields = makeActionCreator('UPDATE_EMBED_FIELDS')

export const urlFetchFailed = makeActionCreator('URL_FETCH_FAILED')