import React from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {compose, pure, withPropsOnChange} from 'recompose'

import * as actions from 'actions'

import ImageChooser from './ImageChooser'

import './MainPage.scss'

const enhance = compose(
  pure,
  withPropsOnChange(
    ['embedFields'],
    props => {
      const {embedFields} = props
      return {
        ...embedFields
      }
    }
  ),
  withPropsOnChange(
    ['actions'],
    props => {
      const {actions: {updateEmbedFields, changeUrlToFetch}} = props
      return {
        changeUrlToFetch: e => changeUrlToFetch(e.target.value),
        changeTitle: e => updateEmbedFields({title: e.target.value}),
        changeDescription: e => updateEmbedFields({description: e.target.value}),
        changeUrl: e => updateEmbedFields({url: e.target.value}),
        changeUseUrl: e => updateEmbedFields({useUrl: e.target.checked})
      }
    }
  )
)

const MainPage = enhance(({
    urlToFetch, changeUrlToFetch,
    title, changeTitle,
    description, changeDescription,
    url, changeUrl,
    useUrl, changeUseUrl
  }) => (
  <div className="main-page">

    <h1>embed.me</h1>

    <h2>Choose a URL to Embed</h2>
    <div className="fetch-url">
      <label>Embed URL:</label>
      <input onChange={changeUrlToFetch} value={urlToFetch}/>
    </div>

    <h2>Create an Embedded URL</h2>
    <div className="embed-info">

      <div className="input-group">
        <label>Title</label>
        <input onChange={changeTitle} value={title}/>
      </div>

      <div className="input-group">
        <label>Description</label>
        <input onChange={changeDescription} value={description}/>
      </div>

      <div className="input-group">
        <label>Use URL</label>
        <input type="checkbox" onChange={changeUseUrl} value={useUrl}/>
      </div>

      <div className="input-group">
        <label>URL</label>
        <input onChange={changeUrl} value={url} disabled={!useUrl}/>
      </div>

      <div className="input-group">
        <label>Choose an image</label>
        <ImageChooser/>
      </div>

      <button>embed.me!</button>
    </div>

    <span className="temp">will appear only after a successful reembedding:</span>
    <h2>Your re-embedded url is: <a href="#">http://embed.me/ag7j</a></h2>

  </div>
))

export default connect(
  (state) => state.main,
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(MainPage)
