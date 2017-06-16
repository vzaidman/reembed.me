import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {compose, pure, withPropsOnChange, lifecycle} from 'recompose'

import * as actions from 'actions'

import ImageChooser from './ImageChooser'

import './MainPage.scss'

const enhance = compose(
  pure,
  withPropsOnChange( ['reembedFields'], props => {
    const {reembedFields} = props
    return {
      ...reembedFields
    }
  }),
  withPropsOnChange( ['actions'], props => {
    const {actions: {changeUrlToFetch, fetchUrl, updateEmbedFields, reembed}} = props
    return {
      changeUrlToFetch: e => changeUrlToFetch(e.target.value),
      fetchUrl,
      changeTitle: e => updateEmbedFields({title: e.target.value}),
      changeDescription: e => updateEmbedFields({description: e.target.value}),
      changeUrl: e => updateEmbedFields({url: e.target.value}),
      changeUseUrl: e => updateEmbedFields({useUrl: e.target.checked}),
      reembed
    }
  }),
  lifecycle({
    //TEMP
    componentDidMount(){
      this.props.actions.changeUrlToFetch('cnn.com')
    }
  })
)
const MainPage = enhance(({
    urlToFetch, changeUrlToFetch,
    fetchUrl,
    title, changeTitle,
    description, changeDescription,
    imageUrl,
    url, changeUrl,
    useUrl, changeUseUrl,
    reembeddedUrl, reembed
  }) => (
  <div className="main-page">

    <h1>embed.me</h1>

    <h2>Choose a URL to Embed</h2>
    <div className="fetch-url">
      <label>Embed URL:</label>
      <input onChange={changeUrlToFetch} value={urlToFetch}/>
    </div>

    <button onClick={fetchUrl}>Get Embedding</button>

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
        <span className="description">
          Some services will use the embedded fields of the chosen URL and ignore your own fields.
        </span>
      </div>

      <div className="input-group">
        <label>URL</label>
        <input onChange={changeUrl} value={url} disabled={!useUrl}/>
      </div>

      <div className="input-group">
        <label>Choose an image</label>
        <ImageChooser imageUrl={imageUrl}/>
      </div>

      <button onClick={reembed}>reembed.me!</button>
    </div>

    {reembeddedUrl && (
      <div className="reembed-info">
        <h2>Your re-embedded url is: <br/><a href={reembeddedUrl}>{reembeddedUrl}</a></h2>
      </div>
    )}

  </div>
))

export default connect(
  (state) => state.main,
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(MainPage)
