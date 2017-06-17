import {createSelector} from 'reselect'

import {normalizeFetchUrl} from './helpers'

export const getReembedFields = state => state.main.reembedFields

export const getUrlToFetch = state => state.main.urlToFetch

export const getNormalizedUrlToFetch = createSelector(
  getUrlToFetch,
  urlToFetch => normalizeFetchUrl(urlToFetch)
)