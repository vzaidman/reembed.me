import { call, put, takeLatest } from 'redux-saga/effects'
import {debounce} from 'lodash'

import * as actions from 'actions'
import {fetchWebsite} from 'services/fetcher'
import {calculateEmbeddedFields} from 'services/siteProcessor'

function* getUrlEmbedInfo(action) {
  const {payload: url} = action
  console.log('saga started')
  try {
    console.log('fetchWebsite')
    const parsedSite = yield call(fetchWebsite, url)

    console.log('calculateEmbeddedFields')
    const embeddedFields = yield call(calculateEmbeddedFields, parsedSite)

    console.log('changeEmbedFields')
    yield put(actions.changeEmbedFields(embeddedFields))
  } catch (e) {
    yield put(actions.urlFetchFailed(e.message))
  }
}

function* mySaga() {
  yield takeLatest(actions.changeUrlToFetch.TYPE, getUrlEmbedInfo)
}

export default mySaga