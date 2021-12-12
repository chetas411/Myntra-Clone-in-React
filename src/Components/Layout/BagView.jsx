import React from 'react'
import { toggleBagView,addItemToBag,removeItemFromBag } from '../../redux/Products'
import { useSelector,useDispatch } from 'react-redux'
import './BagView.css'

const BagView = () => {
    const data = useSelector((state) => state.product.current.bag)
    const dispatch = useDispatch()
    return (
        <div id="screen-overlay">
            <div>
                <h3>your selected items</h3>
                <div id="bag-items">
                {
                    data.map((el) => {
                        return(
                            <div className="bag-items-info" key={el.item.productId}>
                                <img width="40%" src={el.item.searchImage} alt="product" />
                                <div>
                                    <h3>{el.item.brand}</h3>
                                    <p>{el.item.additionalInfo}</p>
                                    <div >
                                        <p>{`Rs. ${el.item.price}`}</p>
                                        <span>{`Rs. ${el.item.mrp}`}</span>
                                        <span>{`${el.item.discountDisplayLabel}`}</span>
                                    </div>
                                    <p style={{ marginTop: "0.25rem" }}>{`Size: ${el.size}`}</p>
                                    <p style={{ marginTop: "0.25rem" }}>{`Qty: ${el.count}`}</p>
                                    <div className="bag-actions">
                                        <button onClick={() => dispatch(addItemToBag({item: el.item, size: el.size}))}>Add</button>
                                        <button onClick={() => dispatch(removeItemFromBag({ item: el.item, size: el.size }))}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
                <button onClick={() => dispatch(toggleBagView(false))}>close</button>
            </div>
        </div>
    )
}

export default BagView
