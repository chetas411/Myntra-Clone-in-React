import React, { useState, useRef, forwardRef} from "react";
import Carousel from "react-elastic-carousel";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addToWishlist,
  removeFromWishList,
  getSimilarProducts,
  toggleShowSimilarProducts,
  selectProduct
} from "../../../redux/Products";
import HeartIcon from "../../../assets/images/heart-icon.svg";
import HeartIconFilled from "../../../assets/images/heart-icon-filled.svg";
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
          marginBottom: "1px",
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
    </div>
  );
};

const ImageCarousel = forwardRef(({ images, show, click }, ref) => {
  const resetPlay = (currenItem, pageIndex) => {
    if (pageIndex === images.length - 1) {
      ref.current.goTo(0);
    }
  };
  return (
    <div style={{ width: "212px" }}>
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
          <img onClick={()=> click()} width="100%" src={imgURL} alt="product" />
        ))}
      </Carousel>
    </div>
  );
});

const Product = ({ data }) => {
  const [showCarousel, setShowCarousel] = useState(false);
  const [inWishList, setInWishList] = useState(data.inWishList === true);
  const currWishlist = useSelector((state) => state.product.current.wishlist);
  const dispatch = useDispatch();
  const carousel = useRef();
  const ImgUrls = [...data.images.map(({ src }) => src)];
  const navigate = useNavigate()
  const similarProductsHandler = () => {
    dispatch(
      getSimilarProducts({ info: data.additionalInfo, id: data.productId })
    );
    dispatch(toggleShowSimilarProducts(true));
  };
  const selectProductHandler = () => {
    dispatch(selectProduct(data))
    navigate("details")
  }

  return (
    <div
      className="product-card"
      onMouseEnter={() => setShowCarousel(true)}
      onMouseLeave={() => setShowCarousel(false)}
      // onClick={selectProductHandler}
    >
      {showCarousel && (
        <button
          onClick={similarProductsHandler}
          className="similar-product-btn"
        >
          View Similar
        </button>
      )}
      <ImageCarousel click={selectProductHandler}  ref={carousel} show={showCarousel} images={ImgUrls} />
      <div
        className="product-info"
        style={{ marginTop: showCarousel ? "1.3rem" : 0 }}
      >
        {!showCarousel && <h3>{data.brand}</h3>}
        {showCarousel ? (
          <>
            <button
              onClick={() => {
                if (currWishlist.includes(data.productId)) {
                  dispatch(removeFromWishList(data.productId));
                } else {
                  dispatch(addToWishlist(data.productId));
                }
              }}
              className="wishlist-btn"
            >
              {currWishlist.includes(data.productId) ? (
                <img src={HeartIconFilled} width={20} alt="heart icon" />
              ) : (
                <img src={HeartIcon} width={20} alt="heart icon" />
              )}
              Wishlist
            </button>
            <p className="product-sizes">
              Sizes:
              <span>{data.sizes.split(",").splice(0, 6).join(", ")}</span>
            </p>
          </>
        ) : (
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
