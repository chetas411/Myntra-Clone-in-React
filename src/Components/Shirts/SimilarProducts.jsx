import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleShowSimilarProducts } from "../../redux/Products";
import "./SimilarProducts.css";

const SimilarProducts = ({ show}) => {
  const currSimilar = useSelector(
    (state) => state.product.current.similarProducts
  );
  const dispatch  = useDispatch()
  return (
    <aside style={{ display: show ? "block" : "none" }} id="similar-products">
      <div onClick={() => dispatch(toggleShowSimilarProducts(false))} id="close-btn">
        Close
      </div>
      {currSimilar.length === 0 ? (
        <div id="error-msg">Sorry, No similar products available !</div>
      ) : (
        <div id="similar-products-grid">
          {currSimilar.map((el) => {
            return (
              <div className="similar-product-card" key={el.productId}>
                <img width="100%" src={el.searchImage} alt="product" />
                <h3>{el.brand}</h3>
                <p>{el.additionalInfo}</p>
                <div className="similar-product-price">
                  <p>{`Rs. ${el.price}`}</p>
                  <span>{`Rs. ${el.mrp}`}</span>
                  <span>{`${el.discountDisplayLabel}`}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </aside>
  );
};

export default SimilarProducts;
