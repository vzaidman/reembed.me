import { call, put, takeLatest, select } from 'redux-saga/effects'

import * as actions from 'actions'
import {getReembedFields, getNormalizedUrlToFetch} from 'selectors'

import {getRelevantTags} from 'services/siteProcessor'
import {fetchWebsite, requestReembed} from 'services/api'

function* updateEmbeddedUrl(){
  const urlToFetch = yield select(getNormalizedUrlToFetch)
  yield put(actions.updateEmbedFields({url: urlToFetch}))
}

function* populateReembedFields() {
  const urlToFetch = yield select(getNormalizedUrlToFetch)

  try {
    const htmlText = yield call(fetchWebsite, urlToFetch)

    const relevantTags = yield call(getRelevantTags, htmlText, urlToFetch)

    yield put(actions.changeEmbedFields({
      ...relevantTags,
      useUrl: false,
      url: urlToFetch
    }))
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
  }
  catch(e){
    yield put(actions.reembed.failure(e.message))
  }
}

function* mySaga() {
  yield takeLatest(actions.changeUrlToFetch.TYPE, updateEmbeddedUrl)
  yield takeLatest(actions.fetchUrl.TYPE, populateReembedFields)
  yield takeLatest(actions.reembed.TYPE, reembed)
}

export default mySaga