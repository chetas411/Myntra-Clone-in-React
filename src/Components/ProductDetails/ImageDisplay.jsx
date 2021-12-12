import React from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import './ImageDisplay.css'
const ImageDisplay = ({images}) => {
    
    return (
        <div id='image-display'>
            {images.map((image)=>{
                return(
                <Zoom>
                    <img width="100%" key={image.view} src={image.src} alt="product" />
                </Zoom>
                )
            })}
        </div>
    )
}

export default ImageDisplay
