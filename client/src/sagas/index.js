import { call, put, takeLatest, select } from 'redux-saga/effects'

import * as actions from 'actions'

import {calculateEmbeddedFields} from 'services/siteProcessor'
import {fetchWebsite, requestReembed} from 'services/api'

function* fetchUrl() {
  const state = yield select()
  const {urlToFetch: url} = state.main
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

function* reembed(){
  try {
    const state = yield select()
    const {reembedFields} = state.main

    const reembeddedUrl = yield call(requestReembed, reembedFields)
    yield put(actions.updateReembeddedUrl(reembeddedUrl))
  }
  catch(e){
    yield put(actions.reembedFailed(e.message))
  }
}

function* mySaga() {
  yield takeLatest(actions.fetchUrl.TYPE, fetchUrl)
  yield takeLatest(actions.reembed.TYPE, reembed)
}

export default mySaga