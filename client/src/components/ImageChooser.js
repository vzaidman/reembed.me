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
const ImageChooser = enhance(({imageUrls, imageUploaded, nextImageUrl}) => {
  const [mainImageUrl, ...otherImageUrls] = imageUrls
  return (
    <div className="image-chooser">
      <div className="content">
        {mainImageUrl && <img className="image-preview main" key={mainImageUrl} src={mainImageUrl}/>}
        <div className="small-images-previews">
          {otherImageUrls.slice(0, 4).map(imageUrl => <img className="image-preview" key={imageUrl} src={imageUrl}/>)}
        </div>
      </div>
      <div className="controls">
        <ReactFilestack
          apikey={fileStackApiKey}
          buttonText="Upload"
          buttonClass="upload-image-button"
          onSuccess={imageUploaded}
        />
        <button className="next-image-button" onClick={nextImageUrl}>Next Image</button>
      </div>
    </div>
  )
})

export default ImageChooser