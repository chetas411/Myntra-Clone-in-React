import React from "react";
import "./Filters.css";

const Filters = () => {
  const genders = ["men", "women", "boys", "girls"];
  const brands = [
    { name: "Roadster", qty: 2741 },
    { name: "Blackberrys", qty: 3211 },
    { name: "Allen Solly", qty: 1541 },
    { name: "Louis Phillipe Sport", qty: 301 },
    { name: "Louis Phillipe", qty: 4741 },
    { name: "ColorPlus", qty: 2385 },
  ];
  const prices = [
    { from: 199, to: 5899, qty: 69040 },
    { from: 5899, to: 11599, qty: 200 },
    { from: 11599, to: 17299, qty: 6 },
  ];
  const colors = [
    { name: "blue", color: "#0074d9", qty: 15543 },
    { name: "white", color: "#ffffff", qty: 9563 },
    { name: "navy blue", color: "#3c4477", qty: 7718 },
    { name: "black", color: "#000000", qty: 4266 },
    { name: "green", color: "#5eb160", qty: 3672 },
  ];
  const discounts = ["10","20","30","40","50","60","70","80"];
  return (
    <div id="filters">
      <h3>Filters</h3>
      <div>
        {genders.map((gen, idx) => {
          return (
            <div className="radio-select" key={gen}>
              <input type="radio" id={gen} name="gender" value={gen} />
              <label
                style={{ fontSize: "0.9rem", fontWeight: 700 }}
                htmlFor={gen}
              >
                {gen}
              </label>
            </div>
          );
        })}
      </div>
      <div>
        <h3>Brand</h3>
        {brands.map(({ name, qty }, idx) => {
          return (
            <div className="radio-select" key={name}>
              <input type="checkbox" id={name} name="gender" value={name} />
              <label htmlFor={name}>
                {name} <span>{`(${qty})`}</span>
              </label>
            </div>
          );
        })}
        <p className="more-btn">+647 more</p>
      </div>
      <div>
        <h3>Price</h3>
        {prices.map(({ from, to, qty }, idx) => {
          return (
            <div className="radio-select" key={`${from}-${to}`}>
              <input
                type="checkbox"
                id={`${from}-${to}`}
                name="gender"
                value={`${from}-${to}`}
              />
              <label htmlFor={`${from}-${to}`}>
                {`Rs. ${from} to Rs. ${to}`} <span>{`(${qty})`}</span>
              </label>
            </div>
          );
        })}
      </div>
      <div>
        <h3>Color</h3>
        {colors.map(({ name, color, qty }, idx) => {
          return (
            <div className="radio-select" key={name}>
              <input type="checkbox" id={name} name="gender" value={name} />
              <label
                style={{ display: "flex", alignItems: "center" }}
                htmlFor={name}
              >
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    marginRight: "0.5rem",
                    backgroundColor: color,
                    borderRadius: "50%",
                    border: (color === "#ffffff")? "1px solid #d6d6d6" : "none"
                  }}
                ></div>{" "}
                {name} <span>{`(${qty})`}</span>
              </label>
            </div>
          );
        })}
        <p className="more-btn">+647 more</p>
      </div>
      <div style={{paddingBottom: "3.5rem"}}>
        <h3>Discount Range</h3>
        {discounts.map((val, idx) => {
          return (
            <div className="radio-select" key={val}>
              <input type="checkbox" id={val} name="gender" value={val} />
              <label style={{textTransform: "lowercase"}} htmlFor={val}>
                {val}% and above
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
