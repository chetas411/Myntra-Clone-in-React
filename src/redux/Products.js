import { createSlice } from "@reduxjs/toolkit";
import MenData from "./Men.json";
import WomenData from "./Women.json";

const initialState = {
  current: {
    products: [...MenData.products, ...WomenData.products],
    filters: [
      ...MenData.filters.primaryFilters.filter((el) => {
        return el.id === "Color" || el.id === "Brand" || el.id === "Gender";
      }),
      ...MenData.filters.rangeFilters.filter((el) => {
        return el.id === "Price" || el.id === "Discount Range";
      }),
    ],
    wishlist: [],
    filterQueries: {
      gender: "neutral",
      brand: [],
      color: [],
      price: [],
      discount: 0,
    },
    similarProducts: [],
    showSimilarProducts: false,
    selectedProduct: {},
    bag: [],
    showBagView: false,
  },
  men: MenData.products,
  women: WomenData.products,
  neutral: [...MenData.products, ...WomenData.products],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    applyFilters: (state, action) => {
      const { filterQueries } = state.current;
      const lower =
        filterQueries.price.length === 0
          ? 0
          : filterQueries.price
              .map((val) => val.start)
              .sort((a, b) => a - b)[0];
      const upper =
        filterQueries.price.length === 0
          ? Number.MAX_SAFE_INTEGER
          : filterQueries.price.map((val) => val.end).sort((a, b) => b - a)[0];
      console.log(lower, upper);
      let currProducts = state[filterQueries.gender];
      currProducts = currProducts.filter((el) => {
        return (
          (filterQueries.brand.includes(el.brand) ||
            filterQueries.brand.length === 0) &&
          (filterQueries.color.includes(el.primaryColour) ||
            filterQueries.color.length === 0) &&
          el.price >= lower &&
          el.price <= upper &&
          parseInt(el.discountDisplayLabel.substring(1, 3)) >=
            filterQueries.discount
        );
      });
      state.current.products = currProducts;
      state.current.filters =
        filterQueries.gender === "women"
          ? [
              ...WomenData.filters.primaryFilters.filter((el) => {
                return (
                  el.id === "Color" || el.id === "Brand" || el.id === "Gender"
                );
              }),
              ...WomenData.filters.rangeFilters.filter((el) => {
                return el.id === "Price" || el.id === "Discount Range";
              }),
            ]
          : [
              ...MenData.filters.primaryFilters.filter((el) => {
                return (
                  el.id === "Color" || el.id === "Brand" || el.id === "Gender"
                );
              }),
              ...MenData.filters.rangeFilters.filter((el) => {
                return el.id === "Price" || el.id === "Discount Range";
              }),
            ];
    },
    addGender: (state, action) => {
      state.current.filterQueries.gender = action.payload;
    },
    addBrand: (state, action) => {
      state.current.filterQueries.brand.push(action.payload);
    },
    removeBrand: (state, action) => {
      state.current.filterQueries.brand =
        state.current.filterQueries.brand.filter((el) => {
          return el !== action.payload;
        });
    },
    addColor: (state, action) => {
      state.current.filterQueries.color.push(action.payload);
    },
    removeColor: (state, action) => {
      state.current.filterQueries.color =
        state.current.filterQueries.color.filter((el) => {
          return el !== action.payload;
        });
    },
    addPrice: (state, action) => {
      state.current.filterQueries.price.push(action.payload);
    },
    removePrice: (state, action) => {
      state.current.filterQueries.price =
        state.current.filterQueries.price.filter((el) => {
          return (
            el.start !== action.payload.start && el.end !== action.payload.end
          );
        });
    },
    addDiscount: (state, action) => {
      state.current.filterQueries.discount = action.payload;
    },
    sortByDiscount: (state, action) => {
      const currProducts = state.current.products;
      state.current.products = currProducts.sort(
        (a, b) =>
          parseInt(b.discountDisplayLabel.substring(1, 3)) -
          parseInt(a.discountDisplayLabel.substring(1, 3))
      );
    },
    sortByIncreasingPrice: (state, action) => {
      const currProducts = state.current.products;
      state.current.products = currProducts.sort((a, b) => a.price - b.price);
    },
    sortByDecreasingPrice: (state, action) => {
      const currProducts = state.current.products;
      state.current.products = currProducts.sort((a, b) => b.price - a.price);
    },
    sortByRating: (state, action) => {
      const currProducts = state.current.products;
      state.current.products = currProducts.sort((a, b) => b.rating - a.rating);
    },
    addToWishlist: (state, action) => {
      state.current.wishlist.push(action.payload);
    },
    removeFromWishList: (state, action) => {
      const currWishlist = state.current.wishlist;
      state.current.wishlist = currWishlist.filter((el) => {
        return el !== action.payload;
      });
    },
    toggleShowSimilarProducts: (state, action) => {
      state.current.showSimilarProducts = action.payload;
    },
    getSimilarProducts: (state, action) => {
      const currSimilar = state.current.products.filter((el) => {
        return (
          el.additionalInfo === action.payload.info &&
          el.productId !== action.payload.id
        );
      });
      state.current.similarProducts = currSimilar;
    },
    selectProduct: (state, action) => {
      state.current.selectedProduct = action.payload;
    },
    addItemToBag: (state, action) => {
      const currBag = state.current.bag;
      let present = false;
      for (let i = 0; i < currBag.length; i++) {
        if (
          action.payload.item.productId === currBag[i].item.productId &&
          action.payload.size === currBag[i].size
        ) {
          ++currBag[i].count;
          present = true;
          break;
        }
      }
      if (!present) {
        state.current.bag.push({
          item: action.payload.item,
          size: action.payload.size,
          count: 1,
        });
      }
      state.current.bag = currBag;
    },
    removeItemFromBag: (state, action) => {
      const currBag = state.current.bag;
      let idx = -1;
      for (let i = 0; i < currBag.length; i++) {
        if (
          action.payload.item.productId === currBag[i].item.productId &&
          action.payload.size === currBag[i].size
        ) {
          idx = i;
          break;
        }
      }
      if (currBag[idx].count === 1) {
        currBag.splice(idx, 1);
      } else {
        --currBag[idx].count;
      }
      state.current.bag = currBag;
    },
    toggleBagView: (state, action) => {
      state.current.showBagView = action.payload;
    },
    searchProducts: (state, action) => {
      if(action.payload === ""){
        state.current.products = [...state.neutral]
      }
      else{
        const keywords = action.payload.toLowerCase().split(" ");
        const currProducts = [...state.neutral];
        const resultProducts = [];
        currProducts.forEach((el) => {
          const text = el.productName.toLocaleLowerCase();
          let count = 0;
          keywords.forEach((word) => {
            const query = new RegExp(word, 'g')
            const res = text.match(query)
            count = (res !== null && res.length >= 1) ? count + 1 : count
          });
          if (count === keywords.length) {
            resultProducts.push(el)
          }
        });
        state.current.products = resultProducts
      }
    },
  },
});

export const {
  addGender,
  addBrand,
  removeBrand,
  addColor,
  removeColor,
  addDiscount,
  addPrice,
  removePrice,
  applyFilters,
  sortByDiscount,
  sortByIncreasingPrice,
  sortByDecreasingPrice,
  sortByRating,
  addToWishlist,
  removeFromWishList,
  getSimilarProducts,
  toggleShowSimilarProducts,
  selectProduct,
  addItemToBag,
  removeItemFromBag,
  toggleBagView,
  searchProducts
} = productSlice.actions;

export default productSlice.reducer;
