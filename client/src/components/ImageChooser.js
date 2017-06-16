import React from 'react'

import {get} from 'lodash'

import {compose, pure, withHandlers} from 'recompose'
import ReactFilestack from 'filestack-react'

import './ImageChooser.scss'

const fileStackApiKey = process.env.FILESTACK_API_KEY

const enhance = compose(
  pure,
  withHandlers({
    imageUploaded: props => event => {
      const uploadedImageUrl = get(event, ['filesUploaded', 0, 'url'])
      if(!uploadedImageUrl){
        //TODO: handle errors
        return
      }
      props.onChange(uploadedImageUrl)
    }
  })
)
const ImageChooser = enhance(({imageUrl, imageUploaded}) => {
  return (
    <div className="image-chooser">
      <div className="content">
        {imageUrl && <img src={imageUrl}/>}
      </div>
      <ReactFilestack
        apikey={fileStackApiKey}
        buttonText="Upload an image"
        buttonClass="upload-image-button"
        onSuccess={imageUploaded}
      />
    </div>
  )
})

export default ImageChooser