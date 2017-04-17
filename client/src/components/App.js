import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {pure} from 'recompose'

import * as actions from 'actions'
import './App.scss'

const App = pure(({toggled, actions: {toggle}}) => (
  <div className="app">
    <a href="/redirect/">Redirect Link</a>
    <button onClick={toggle}>toggle</button>
    <span>{toggled ? 'toggled' : 'not toggled'}</span>
  </div>
))

export default connect(
  (state) => ({
    toggled: state.main.toggled
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(App)
