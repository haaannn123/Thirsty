import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk } from "../../store/shopping_cart";
import { thunkGetAllProducts } from "../../store/products";
import Counter from "./QuantityTracker";
import "./ShoppingCart.css";
// import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import DeleteCartItem from "./DeleteCartItem";

import MakeAPurchase from "./MakeAPurchase";


const ShoppingCart = () => {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false)
  const [cartTotal, setCartTotal] = useState(0)
  let total = 0
  let totalItems = 0

  const user = useSelector((state) => state.session.user);
  const products = useSelector((state) => state.products.allProducts);
  const productsArr = Object.values(products);
  // console.log("PRODUCTS-->", products);
  const userCart = Object.values(useSelector((state) => state.userCart.userCart));
  // const userCartArr = Object.values(userCart);
  console.log("USER CART ARRAY-->", userCart);



  useEffect( async() => {


    const fetchData = async () => {
      setIsLoaded(false);
      await dispatch(getCartThunk());
      await dispatch(thunkGetAllProducts());
      setIsLoaded(true);
    };

    fetchData();

  }, [dispatch]);

  useEffect( async () => {

    await dispatch(getCartThunk());
  }, [dispatch])

  if (!products || !userCart) return null;

  const noUser = () => {
    if (!user) {
      return (
        <>
          <h3>Please Log In</h3>
        </>
      )
    }
  }

// console.log("USER IN USER CAR---------T", user.id)
return (
  (!isLoaded) ? <div className='LOADING-SCREEN'></div> :
  <div className="shopping-cart-container">
    <h1 className="shopping-cart-header">Shopping Cart</h1>
    {user && userCart.length ?
              <div>
                <>
                  {userCart.map((item,idx) => {
                    // console.log("ITEM--------------------",item.quantity)
                      const product = productsArr.find(product => item.product_id === product.id);
                      return product ?
                          <div className="cart-card" key={`Cart-${idx}`}>
                            <div className="individual-item-card">
                              <div className="cart-item-image-container">
                                <img
                                    src={product.preview_img}
                                    alt={`${product.name}'s unavaiable`}
                                    className="cart-product-image"
                                    />
                              </div>
                              <div className="cart-item-info-container">
                              <div>
                                <span style={{ textDecoration: 'underline', fontFamily: 'system-ui', color: 'black' }}>ITEM</span><span style={{color: 'black'}}> : </span>{product.name}
                              </div>

                                <div><span style={{ textDecoration: 'underline', fontFamily: 'system-ui', color: 'black'  }}>PRICE</span><span style={{color: 'black'}}> : </span>${product.price}</div>
                                <div>
                                  <Counter quantity={item.quantity} item={product} />
                                </div>
                                <div><span style={{ textDecoration: 'underline', fontFamily: 'system-ui', color: 'black'  }}>ITEM TOTAL</span><span style={{color: 'black'}}> : </span>${(product.price * item.quantity).toFixed(2)}</div>
                                <div>
                                  <OpenModalButton
                                    buttonText = "Delete Item"
                                    modalComponent={<DeleteCartItem product={product} cartItem={item}/>}

                                  />
                                </div>
                            </div>
                          </div>

                              <div className="hidden-total">{total += (product.price * item.quantity)}</div>
                              <div className="hidden-total">{totalItems += item.quantity}</div>
                          </div>

                      : null;

                  })}
                </>
                    <div className="cart-total-container">
                      <div className="cart-total-image-container">
                        <i class="fa-solid fa-cart-shopping cart-total-logo"></i>
                      </div>
                      <div className="cart-total-info-container">
                        <div className="cart-total"><span style={{ textDecoration: 'underline', fontFamily: 'system-ui', fontSize: '1.7rem', color: 'black'  }}>TOTAL ITEMS</span><span style={{fontSize: '1.7rem'  }}><span style={{color: 'black'}}> : </span>{totalItems}</span></div>
                        <div className="cart-total"><span style={{ textDecoration: 'underline', fontFamily: 'system-ui', fontSize: '1.7rem', color: 'black'  }}>CART TOTAL</span><span style={{fontSize: '1.7rem'  }}><span style={{color: 'black'}}> : </span>${total.toFixed(2)}</span></div>
                        <div className="checkout-button">
                                  <OpenModalButton
                                    buttonText = "CHECKOUT"
                                    modalComponent={<MakeAPurchase userId={user.id} totalPurchaseAmount={total}/>}
                                  />
                        </div>
                      </div>
                    </div>
              </div>
              : <div className="cup-image-container">
                  <img src='/images/empty-glass-clip-art.png' alt='empty-cup' className='cup-image'/>
                  <h1>Your Cup is Empty</h1>
                  {noUser()}
              </div>
          }
  </div>
);

};

export default ShoppingCart;
