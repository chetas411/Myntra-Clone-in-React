import React from 'react'
import { useSelector } from 'react-redux'
import './Breadcrum.css'

const Breadcrum = ({showQty,children}) => {
    const productsQty = useSelector((state) => state.product.current.products.length) 
    return (
        <header id="product-header">
            <div>
                {children}
            </div>
            {showQty && <div>
                <h3>Shirts For Men & Women</h3>
                <p>{`- ${productsQty} items`}</p>
            </div>}
        </header>
    )
}

export default Breadcrum
