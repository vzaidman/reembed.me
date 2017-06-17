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
    },
    dontUseImage: props => event => {
      props.addImageUrl(null)
    }
  })
)
const ImageChooser = enhance(({imageUrls, imageUploaded, nextImageUrl, dontUseImage}) => {
  const [mainImageUrl, ...otherImageUrls] = imageUrls
  return (
    <div className="image-chooser">
      <div className="content">
        {mainImageUrl ?
          <img className="image-preview main" key={mainImageUrl} src={mainImageUrl}/> :
          <div className="image-preview main"><span>No image</span></div>
        }
        <div className="small-images-previews">
          {otherImageUrls.slice(0, 4).map(imageUrl => <img className="image-preview" key={imageUrl} src={imageUrl}/>)}
        </div>
      </div>
      <div className="controls">
        <button className="image-button" onClick={nextImageUrl}>Use next image</button>
        <ReactFilestack
          apikey={fileStackApiKey}
          buttonText="Upload image"
          buttonClass="image-button"
          onSuccess={imageUploaded}
        />
        <button className="image-button" onClick={dontUseImage}>Don't use image</button>
      </div>
    </div>
  )
})

export default ImageChooser