import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk } from "../../store/shopping_cart";
import { thunkGetAllProducts } from "../../store/products";
import Counter from "./QuantityTracker";
import "./ShoppingCart.css";

const ShoppingCart = () => {
  const dispatch = useDispatch();



  const user = useSelector((state) => state.session.user);
  const products = useSelector((state) => state.products.allProducts);
  const productsArr = Object.values(products);
  // console.log("PRODUCTS-->", products);
  const userCart = useSelector((state) => state.userCart.userCart);
  const userCartArr = Object.values(userCart);
  console.log("USER CART ARRAY-->", userCartArr);


  useEffect(() => {
    dispatch(getCartThunk());
    dispatch(thunkGetAllProducts());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getCartThunk());
  // }, [dispatch]);

  if (!products || !userCart) return null;

  const noUser = () => {
    if (!user) {
      return (
        <>
          <h3>Please Log In :)</h3>
        </>
      )
    }
  }



  return (
    <div className="shopping-cart-container">
      <h1>Shopping Cart</h1>
      {user && userCartArr.length ?
                <div>
                    {userCartArr.map(item => {
                        const product = productsArr.find(product => item.product_id === product.id);
                        return product ?
                            <div className="cart-card">
                                <div>{product.name}</div>
                                <img
                                    src={product.preview_img}
                                    alt={`${product.name}'s unavaiable`}
                                    className="cart-product-image"
                                />
                                <div>PRICE: ${product.price}</div>
                                <div>
                                  <Counter quantity={item.quantity}/>
                                </div>
                            </div>
                        : null;
                    })}
                </div>
                : <div className="cup-image-container">
                    <img src='/images/empty-glass-clip-art.png' alt='empty-cup' className='cup-image'/>
                    <h1>Your Cup is Empty 💧</h1>
                    {noUser()}
                </div>
            }
    </div>
  );
};

export default ShoppingCart;
