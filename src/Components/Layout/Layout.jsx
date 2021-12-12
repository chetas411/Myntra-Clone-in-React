import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchProducts,toggleBagView } from "../../redux/Products";
import BagView from "./BagView";
import Logo from "../../assets/images/logo.jpg";
import SearchIcon from "../../assets/images/search-icon.svg";
import ProfileIcon from "../../assets/images/profile-icon.svg";
import HeartIcon from "../../assets/images/heart-icon.svg";
import BagIcon from "../../assets/images/bag-icon.svg";
import "./Layout.css";

const Layout = ({ children, horizontalPadding }) => {
  const [searchValue,setSearchValue] = useState("")
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(searchProducts(searchValue))
  },[searchValue])
  const showBag = useSelector((state) => state.product.current.showBagView)
  return (
    <div
      style={{ padding: `0 ${horizontalPadding ? "1.75rem" : 0}` }}
      id="layout"
    >
      <nav id="navbar">
        <div id="logo">
          <img width="53px" src={Logo} alt="myntra logo" />
        </div>
        <div className="tabs">
          <div>
            <a className="tab" href="/">
              Men
            </a>
          </div>
          <div>
            <a className="tab" href="/">
              Women
            </a>
          </div>
          <div>
            <a className="tab" href="/">
              Kids
            </a>
          </div>
          {/* <div>
            <a className="tab" href="/">
              Home & Living
            </a>
          </div> */}
          <div>
            <a className="tab" href="/">
              Beauty
            </a>
          </div>
        </div>
        <div id="search-bar">
          <div>
            <img width="15" src={SearchIcon} alt="search" />
          </div>
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="tabs">
          <div className="tab-btn">
            <img width="20" src={ProfileIcon} alt="profile" />
            <p>Profile</p>
          </div>
          <div className="tab-btn">
            <img width="20" src={HeartIcon} alt="profile" />
            <p>Wishlist</p>
          </div>
          <div onClick={() => dispatch(toggleBagView(true))} className="tab-btn">
            <img width="20" src={BagIcon} alt="profile" />
            <p>Bag</p>
          </div>
        </div>
      </nav>
      {showBag && <BagView />}
      <section className="main">
        {children}
      </section>
    </div>
  );
};

export default Layout;
