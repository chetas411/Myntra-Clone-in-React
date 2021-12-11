import React, { useState,useRef,forwardRef } from "react";
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
                marginTop: "-30px",
            }}
        >
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    padding: "0.75rem",
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
        <div style={{width: "212px" ,height: "282px"}}>
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

const Product = ({data}) => {
    const [showCarousel, setShowCarousel] = useState(false);
    const carousel = useRef();
    const ImgUrls = [...data.images.map(({src})=> src)]
    
    return (
        <div className="product-card" onMouseEnter={() => setShowCarousel(true)} onMouseLeave={() => setShowCarousel(false)}>
            <ImageCarousel ref={carousel} show={showCarousel} images={ImgUrls} />
            <div className="product-info" style={{marginTop: (showCarousel)? "1.3rem" : 0}}>
                {!showCarousel && <h3>{data.brand}</h3>}
                {showCarousel?(
                    <p className="product-sizes">Sizes:
                        <span>
                            {data.sizes.split(',').splice(0,6).join(', ')}
                        </span>
                    </p>
                ):(
                        <p>{data.additionalInfo}</p>
                )}
                <div className="product-price">
                    <p>{`Rs. ${data.price}`}</p>
                    <span>{`Rs. ${data.mrp}`}</span>
                    <span>{`${data.discountDisplayLabel}`}</span>
                </div>
            </div>
        </div>
    );
};

export default Product;
