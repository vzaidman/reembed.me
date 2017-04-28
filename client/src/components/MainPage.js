import React from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {pure} from 'recompose'

import * as actions from 'actions'

import './MainPage.scss'

const MainPage = pure(({fetchedURL, actions: {changeURLToFetch}}) => (
  <div className="main-page">
    <h1>embed.me</h1>
    <div className="fetch-url">
      <label>Embed URL:</label>
      <input onChange={changeURLToFetch} value={fetchedURL} />
    </div>
  </div>
))

export default connect(
  (state) => state.main,
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(MainPage)
