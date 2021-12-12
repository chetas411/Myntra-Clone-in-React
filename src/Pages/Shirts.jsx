import React, { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../Components/Layout/Layout";
import Breadcrum from "../Components/Shirts/Breadcrum";
import Filters from "../Components/Shirts/Filters";
import AdditionalFilters from "../Components/Shirts/AdditionalFilters";
import ProductSection from "../Components/Shirts/ProductSection/ProductSection";
import SimilarProducts from "../Components/Shirts/SimilarProducts";
import './Shirts.css'

const Shirts = () => {
  const showSimilar = useSelector(
    (state) => state.product.current.showSimilarProducts
  );
  return (
    <Layout>
      <Breadcrum showQty>
        <a href="/">Home</a> / <a href="/">Clothing</a> /{" "}
        <span style={{ fontWeight: 700 }}>Shirts For Men & Women</span>
      </Breadcrum>
      <main
        style={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Filters />
        <div
          id="main-page"
          
        >
          <AdditionalFilters />
          <ProductSection />
        </div>
      </main>
      <SimilarProducts show={showSimilar} />
    </Layout>
  );
};

export default Shirts;
