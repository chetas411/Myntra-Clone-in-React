import React from 'react'
import { useSelector } from 'react-redux'
import './Breadcrum.css'

const Breadcrum = () => {
    const productsQty = useSelector((state) => state.product.current.products.length) 
    return (
        <header id="product-header">
            <div>
                <a href='/'>Home</a> / <a href='/'>Clothing</a> / <span style={{fontWeight: 700}}>Shirts For Men & Women</span>
            </div>
            <div>
                <h3>Shirts For Men & Women</h3>
                <p>{`- ${productsQty} items`}</p>
            </div>
        </header>
    )
}

export default Breadcrum
