import React from 'react'
import './Breadcrum.css'

const Breadcrum = () => {
    return (
        <header id="product-header">
            <div>
                <a href='/'>Home</a> / <a href='/'>Clothing</a> / <span style={{fontWeight: 700}}>Shirts For Men & Women</span>
            </div>
            <div>
                <h3>Shirts For Men & Women</h3>
                <p>- 69186 items</p>
            </div>
        </header>
    )
}

export default Breadcrum
