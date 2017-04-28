import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {pure} from 'recompose'

import './App.scss'

import MainPage from './MainPage'

const App = pure(() => (
  <div className="app">
    <MainPage/>
  </div>
))

export default App
