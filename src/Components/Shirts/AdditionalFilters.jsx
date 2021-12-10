import React from 'react'
import DownArrow from '../../assets/images/Down-arrow.svg'
import './AdditionalFilters.css'

const AdditionalFilters = () => {
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
                <span>Recommended</span>
                <img width={20} src={DownArrow} alt="arrow-icon" />
                <ul id="sort-list">
                    <li>Better Discount</li>
                    <li>Price: Hight to Low</li>
                    <li>Price: Low to hight</li>
                    <li>Customer Rating</li>
                </ul>
            </div>
        </div>
    )
}

export default AdditionalFilters
