import React from "react";
import { useSelector } from "react-redux";
import Layout from "../Components/Layout/Layout";
import Breadcrum from "../Components/Shirts/Breadcrum";
import ImageDisplay from "../Components/ProductDetails/ImageDisplay";
import InfoSection from "../Components/ProductDetails/InfoSection";

const ProductDetails = () => {
  const gen = useSelector(
    (state) => state.product.current.filterQueries.gender
  );
  const product = useSelector((state) => state.product.current.selectedProduct)
  return (
    <Layout>
      <Breadcrum>
        <a href="/">Home</a> / <a href="/">Clothing</a> /{" "}
        <a style={{ textTransform: "capitalize" }} href="/">
          {`${gen === "women" ? "women" : "men"}`} Clothing
        </a>{" "}
        / <a href="/">Shirts</a> /{" "}
        <span style={{ fontWeight: 700 }}>Shirts For Men & Women</span>
      </Breadcrum>
      <main
        style={{
          display: "flex",
          justifyContent: "flex-start",
          padding: "0 1rem",
        //   border: "1px solid red",
        }}
        id="details-section"
      >
        <ImageDisplay images={product.images} />
        <InfoSection data={product} />
      </main>
    </Layout>
  );
};

export default ProductDetails;
