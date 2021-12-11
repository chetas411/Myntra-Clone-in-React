import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addGender,
  addBrand,
  removeBrand,
  addColor,
  removeColor,
  addDiscount,
  addPrice,
  removePrice,
  applyFilters
} from "../../redux/Products";
import "./Filters.css";

const Filters = () => {
  const [radio, setRadio] = useState({
    men: false,
    women: false,
  });
  const [discount,setDiscount] = useState(0)
  const data = useSelector((state) => state.product.current.filters);
  const filterState = useSelector((state) => state.product.current.filterQueries)
  const dispatch = useDispatch();
  useEffect(() => {
    if (radio.men) {
      dispatch(addGender("men"));
    } else if (radio.women) {
      dispatch(addGender("women"));
    } else {
      dispatch(addGender("neutral"));
    }
  }, [radio]);
  useEffect(()=>{
    dispatch(addDiscount(discount))
  }, [discount])
  useEffect(()=>{
    dispatch(applyFilters())
  },[filterState])
  const filterData = data.reduce((obj, item) => {
    return {
      ...obj,
      [item.id]: item,
    };
  }, {});
  const genders = filterData["Gender"].filterValues;
  const brands = filterData["Brand"].filterValues;
  const prices = filterData["Price"].filterValues;
  const Colors = filterData["Color"].filterValues;
  const Discounts = filterData["Discount Range"].filterValues;

  return (
    <div id="filters">
      <h3>Filters</h3>
      <div>
        {genders.map(({ value }, idx) => {
          return (
            <div className="radio-select" key={value}>
              <input
                type="radio"
                id={value}
                name="gender"
                value={value}
                checked={radio[value]}
                onClick={(e) => {
                  if (radio[value]) {
                    setRadio((prev) => {
                      return { ...prev, [value]: false };
                    });
                  } else {
                    setRadio((prev) => {
                      return { men: false, women: false, [value]: true };
                    });
                  }
                }}
              />
              <label
                style={{ fontSize: "0.9rem", fontWeight: 700 }}
                htmlFor={value}
              >
                {value}
              </label>
            </div>
          );
        })}
      </div>
      <div>
        <h3>Brand</h3>
        {brands.slice(0, 6).map(({ value, count }, idx) => {
          return (
            <div className="radio-select" key={value}>
              <input
                onChange={(e) => {
                  if (e.target.checked) {
                    dispatch(addBrand(value));
                  } else {
                    dispatch(removeBrand(value));
                  }
                }}
                type="checkbox"
                id={value}
                name="gender"
                value={value}
              />
              <label htmlFor={value}>
                {value} <span>{`(${count})`}</span>
              </label>
            </div>
          );
        })}
        <p className="more-btn">{`+${brands.length - 6} more`}</p>
      </div>
      <div>
        <h3>Price</h3>
        {prices.map(({ start, end, count, id }, idx) => {
          return (
            <div className="radio-select" key={id}>
              <input
                type="checkbox"
                id={`${start}-${end}`}
                name="gender"
                value={`${start}-${end}`}
                onChange={(e) => {
                  if (e.target.checked) {
                    dispatch(addPrice({start,end}))
                  }
                  else {
                    dispatch(removePrice({start,end}))
                  }
                }}
              />
              <label htmlFor={`${start}-${end}`}>
                {`Rs. ${start} to Rs. ${end}`} <span>{`(${count})`}</span>
              </label>
            </div>
          );
        })}
      </div>
      <div>
        <h3>Color</h3>
        {Colors.slice(0, 7).map(({ meta, value, count }, idx) => {
          return (
            <div className="radio-select" key={value}>
              <input
                type="checkbox"
                id={value}
                name="gender"
                value={value}
                onChange={(e) => {
                  if (e.target.checked) {
                    dispatch(addColor(value));
                  } else {
                    dispatch(removeColor(value));
                  }
                }}
              />
              <label
                style={{ display: "flex", alignItems: "center" }}
                htmlFor={value}
              >
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    marginRight: "0.5rem",
                    backgroundColor: `#${meta}`,
                    borderRadius: "50%",
                    border: meta === "#ffffff" ? "1px solid #d6d6d6" : "none",
                  }}
                ></div>{" "}
                {value} <span>{`(${count})`}</span>
              </label>
            </div>
          );
        })}
        <p className="more-btn">{`+${Colors.length - 7} more`}</p>
      </div>
      <div style={{ paddingBottom: "3.5rem" }}>
        <h3>Discount Range</h3>
        {Discounts.map(({ id, start }, idx) => {
          return (
            <div className="radio-select" key={id}>
              <input type="checkbox" id={start} name="gender" value={start}
                checked = {start === discount}
                onClick={(e) => {
                  if (discount === start) {
                    setDiscount(0)
                  } else {
                    setDiscount(start)
                  }
                }}
              />
              <label style={{ textTransform: "lowercase" }} htmlFor={start}>
                {start}% and above
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
