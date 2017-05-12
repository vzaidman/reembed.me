import { call, put, takeLatest, select } from 'redux-saga/effects'

import * as actions from 'actions'
import {getReembedFields} from 'selectors'

import {calculateEmbeddedFields} from 'services/siteProcessor'
import {fetchWebsite, requestReembed} from 'services/api'

function* populateReembedFields() {
  const state = yield select()
  const {urlToFetch: url} = state.main
  try {
    const parsedSite = yield call(fetchWebsite, url)

    const embeddedFields = yield call(calculateEmbeddedFields, parsedSite)

    yield put(actions.changeEmbedFields(embeddedFields))
  }
  catch (e) {
    yield put(actions.urlFetchFailed(e.message))
  }
}

function* reembed(){
  try {
    const reembedFields = yield select(getReembedFields)

    const reembeddedUrl = yield call(requestReembed, reembedFields)

    yield put(actions.changeReembeddedUrl(reembeddedUrl))
    // yield put(actions.reembed.success(reembeddedUrl))
  }
  catch(e){
    yield put(actions.reembed.failure(e.message))
  }
}

function* mySaga() {
  yield takeLatest(actions.fetchUrl.TYPE, populateReembedFields)
  yield takeLatest(actions.reembed.TYPE, reembed)
}

export default mySaga