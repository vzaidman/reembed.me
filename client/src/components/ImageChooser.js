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
      props.addImageUrl(uploadedImageUrl)
    }
  })
)
const ImageChooser = enhance(({imageUrl, imageUploaded, nextImageUrl}) => {
  return (
    <div className="image-chooser">
      <div className="content">
        {imageUrl && <img src={imageUrl}/>}
      </div>
      <div className="controls">
        <ReactFilestack
          apikey={fileStackApiKey}
          buttonText="Upload an image"
          buttonClass="upload-image-button"
          onSuccess={imageUploaded}
        />
        <button className="next-image-button" onClick={nextImageUrl}>Next Image</button>
      </div>
    </div>
  )
})

export default ImageChooser