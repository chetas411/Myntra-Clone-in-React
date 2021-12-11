import React from 'react'
import { useSelector } from 'react-redux'
import Product from './Product'
import './ProductSection.css'

const ProductSection = () => {
    const productsData = useSelector((state) => state.product.current.products)
    return (
        <div id='product-section'>
            {productsData.map((product) => {
                return <Product data={product} key={product.productId} />
            })}
        </div>
    )
}

export default ProductSection
