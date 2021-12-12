import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItemToBag, removeItemFromBag, toggleBagView } from '../../redux/Products'
import StarIcon from '../../assets/images/star-icon.svg'
import './InfoSection.css'

const InfoSection = ({data}) => {
    const [selectedSize,setSelectedSize] = useState("0")
    const [showError,setShowError] = useState(false)
    const dispatch = useDispatch()
    const selectHandler = (val) => {
        setShowError(false);
        setSelectedSize(val)
    }
    const addToBagHandlder = () => {
        if(selectedSize === "0"){
            setShowError(true)
        }
        else{
            dispatch(addItemToBag({item: data, size: selectedSize}))
            dispatch(toggleBagView(true))
        }
    }
    return (
        <div id='info-section'>
            <div id="info-header">
                <h2>{data.brand}</h2>
                <p>{data.additionalInfo}</p>
                <div>
                    <span>{data.rating.toFixed(1)}</span>
                    <img width={20} src={StarIcon} alt="rating" />
                </div>
            </div>
            <div className="info-price">
                <p>{`Rs. ${data.price}`}</p>
                <span>{`Rs. ${data.mrp}`}</span>
                <span>{`${data.discountDisplayLabel}`}</span>
            </div>
            <p style={{color: "green", fontWeight: "600"}}>inclusive of all taxes</p>
            <p style={{marginTop: "1rem", fontWeight: "600" }}>SELECT SIZE</p>
            <div className='info-size'>
                {data.inventoryInfo.map((size)=>{
                    return(
                        <div style={{ borderColor: (selectedSize === size.label) ? "#ff3e6c" :"#7e818c"}} onClick={() => selectHandler(size.label)} key={size.skuId}>
                            {size.label}
                        </div>
                    )
                })}
            </div>
            <button onClick={addToBagHandlder} className='add-btn'>add to bag</button>
            {showError && <p style={{ fontWeight: 600 }}>Please select a size first !</p>}
        </div>
    )
}

export default InfoSection
