import React, { useState,useRef,forwardRef, useEffect } from "react";
import Carousel from "react-elastic-carousel";
import HeartIcon from '../../../assets/images/heart-icon.svg'
import "./Product.css";

const Pagination = ({ pages, activePage, onClick }) => {
    return (
        <div
            style={{
                width: "100%",
                zIndex: "4",
                backgroundColor: "#ffffff",
                marginTop: "-30px"
            }}
        >
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    padding: "0.5rem",
                    marginBottom: "0.35rem",
                    zIndex: "4",
                    backgroundColor: "#ffffff",
                }}
            >
                {pages.map((page) => {
                    const isActivePage = activePage === page;
                    return (
                        <div
                            style={{
                                width: "5px",
                                height: "5px",
                                marginRight: "0.25rem",
                                borderRadius: "50%",
                                backgroundColor: isActivePage ? "#f41cb2" : "lightgray",
                            }}
                            key={page}
                            onClick={() => onClick(page)}
                            active={isActivePage}
                        ></div>
                    );
                })}
            </div>
            <button className="wishlist-btn">
                <img src={HeartIcon} width={20} alt="heart icon" />
                Wishlist
            </button>
        </div>
        
    );
};

const ImageCarousel = forwardRef(({ images,show },ref) => {
    const resetPlay = (currenItem,pageIndex) => {
        if(pageIndex === images.length - 1){
            ref.current.goTo(0)
        }
    }
    return (
        <div>
            <Carousel
                renderPagination={Pagination}
                pagination={show}
                itemsToShow={1}
                initialActiveIndex={0}
                showArrows={false}
                enableAutoPlay={show}
                autoPlaySpeed={1300}
                ref={ref}
                onChange={resetPlay}
            >
                {images.map((imgURL) => (
                    <img width="100%" src={imgURL} alt="product" />
                ))}
            </Carousel>
        </div>
    );
});

const Product = () => {
    const [showCarousel, setShowCarousel] = useState(false);
    const carousel = useRef();
    const imgsURL = [
        "http://assets.myntassets.com/assets/images/1291760/2017/12/5/11512469309123-Highlander-Dark-Green-Slim-Fit-Casual-Shirt-5071512469308877-1.jpg",
        "http://assets.myntassets.com/assets/images/1291760/2017/12/5/11512469309046-Highlander-Dark-Green-Slim-Fit-Casual-Shirt-5071512469308877-4.jpg",
        "http://assets.myntassets.com/assets/images/1291760/2017/12/5/11512469309068-Highlander-Dark-Green-Slim-Fit-Casual-Shirt-5071512469308877-3.jpg",
        "http://assets.myntassets.com/assets/images/1291760/2017/12/5/11512469309092-Highlander-Dark-Green-Slim-Fit-Casual-Shirt-5071512469308877-2.jpg",
        "http://assets.myntassets.com/assets/images/1291760/2017/12/5/11512469309020-Highlander-Dark-Green-Slim-Fit-Casual-Shirt-5071512469308877-5.jpg"

    ];
    
    return (
        <div className="product-card" onMouseEnter={() => setShowCarousel(true)} onMouseLeave={() => setShowCarousel(false)}>
            <ImageCarousel ref={carousel} show={showCarousel} images={imgsURL} />
            <div className="product-info">
                {!showCarousel && <h3>jainish</h3>}
                {showCarousel?(
                    <p className="product-sizes">Sizes:
                        <span>32, </span>
                        <span>36, </span>
                        <span>38, </span>
                        <span>40, </span>
                        <span>42 </span>
                    </p>
                ):(
                        <p>men formal shirt</p>
                )}
                <div className="product-price">
                    <p>Rs. 519</p>
                    <span>Rs. 1299</span>
                    <span>(60% OFF)</span>
                </div>
            </div>
        </div>
    );
};

export default Product;
