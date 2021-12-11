import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { sortByDiscount,sortByIncreasingPrice,sortByDecreasingPrice,sortByRating } from '../../redux/Products'
import DownArrow from '../../assets/images/Down-arrow.svg'
import './AdditionalFilters.css'

const AdditionalFilters = () => {
    const [sortQuery,setSortQuery] = useState({name: "Recommended", value: "default"})
    const productState = useSelector((state) => state.product.current.products)
    const dispatch = useDispatch()
    useEffect(() => {
        switch (sortQuery.value) {
            case "discount": dispatch(sortByDiscount()) 
                break;
            case "increasingPrice": dispatch(sortByIncreasingPrice())
                break;
            case "decreasingPrice": dispatch(sortByDecreasingPrice())
                break;
            case "rating": dispatch(sortByRating())
                break;
            default:
                break;
        }
    },[sortQuery,productState])
    const filters = ["bundles","character","collar","country of origin","fabric"]
    const showList = (e) => {
        const el = document.querySelector('#sort-list');
        el.style.display = "block";
    }
    const hideList = (e) => {
        const el = document.querySelector('#sort-list');
        el.style.display = "none";
    }
    return (
        <div id="additional-filters">
            <div id="filter-tabs">
                {
                    filters.map((filter,idx)=>{
                        return(
                            <div className='filter-btn'>
                                {filter}
                                <img width={12} src={DownArrow} alt="arrow-icon" />
                            </div>
                        )
                    })
                }
            </div>
            <div onMouseOver={showList} onMouseLeave={hideList} id='sort-input'>
                Sort by : 
                <span>{sortQuery.name}</span>
                <img width={20} src={DownArrow} alt="arrow-icon" />
                <ul id="sort-list">
                    <li onClick={() => setSortQuery({ name: "Better Discount",value:"discount"})}>Better Discount</li>
                    <li onClick={() => setSortQuery({ name: "Price: High to Low", value: "decreasingPrice" })}>Price: High to Low</li>
                    <li onClick={() => setSortQuery({ name: "Price: Low to high", value: "increasingPrice" })}>Price: Low to high</li>
                    <li onClick={() => setSortQuery({ name: "Customer Rating", value: "rating" })}>Customer Rating</li>
                </ul>
            </div>
        </div>
    )
}

export default AdditionalFilters
