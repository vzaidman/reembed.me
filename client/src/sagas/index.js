import { call, put, takeLatest, select } from 'redux-saga/effects'

import * as actions from 'actions'
import {getReembedFields, getUrlToFetch} from 'selectors'

import {getRelevantTags} from 'services/siteProcessor'
import {fetchWebsite, requestReembed} from 'services/api'

function* populateReembedFields() {
  const urlToFetch = yield select(getUrlToFetch)
  try {
    const htmlText = yield call(fetchWebsite, urlToFetch)

    const relevantTags = yield call(getRelevantTags, htmlText, urlToFetch)

    debugger

    yield put(actions.changeEmbedFields(relevantTags))
  }
  catch (e) {
    yield put(actions.populdateReembedFailed(e.message))
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