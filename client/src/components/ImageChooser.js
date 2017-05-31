import React from 'react'

import {pure} from 'recompose'

import './ImageChooser.scss'

const ImageChooser = pure(({imageUrl}) => {
  return (
    <div className="image-chooser">
      {imageUrl ? <img src={imageUrl}/> : "Image Chooser"}
    </div>
  )
})

export default ImageChooser