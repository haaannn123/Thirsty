import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import React from "react";
import { thunkGetAllProducts } from "../../store/products";
import { NavLink } from "react-router-dom";
import "./products.css";

const GetAllProducts = () => {
  const dispatch = useDispatch();
  const allProducts = Object.values(useSelector((state) => state.products.allProducts));

  useEffect(() => {
    dispatch(thunkGetAllProducts());
  }, [dispatch]);

  if (!Object.keys(allProducts).length) {
    return <i className="fa-solid fa-truck-ramp-box spot-info-loading">LOADING...</i>;
  }

  return (
    <div className="all-products-container">
      {allProducts.map((product) => {
        return (
          <div key={product.id} className="all-products-card">
            <NavLink to={`/products/${product.id}`}>
              <img src={product.preview_img} alt={`${product.name}'s unavaiable`} className="all-products-image"></img>
              <div class="all-products-price-container">
                <div className="all-products-price">${`${product.price.toFixed(2)}`}</div>
              </div>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};


export default GetAllProducts;
