import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk } from "../../store/shopping_cart";
import { thunkGetAllProducts } from "../../store/products";
import Counter from "./QuantityTracker";
import "./ShoppingCart.css";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import DeleteCartItem from "./DeleteCartItem";

const ShoppingCart = () => {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false)
  const [cartTotal, setCartTotal] = useState(0)
  let total = 0

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

return (
  (!isLoaded) ? <div className='LOADING-SCREEN'></div> :
  <div className="shopping-cart-container">
    <h1>Shopping Cart</h1>
    {user && userCart.length ?
              <div>
                <>
                  {userCart.map((item,idx) => {
                    // console.log("ITEM--------------------",item.quantity)
                      const product = productsArr.find(product => item.product_id === product.id);
                      return product ?

                          <div className="cart-card" key={`Cart-${idx}`}>
                              <div>{product.name}</div>
                              <img
                                  src={product.preview_img}
                                  alt={`${product.name}'s unavaiable`}
                                  className="cart-product-image"
                              />
                              <div>PRICE: ${product.price}</div>
                              <div>
                                <Counter quantity={item.quantity} item={product} />
                              </div>
                              <div>
                                <OpenModalButton
                                   buttonText = "Delete Item"
                                   modalComponent={<DeleteCartItem product={product} cartItem={item}/>}
                                />

                              </div>
                              <div>ITEM TOTAL: ${(product.price * item.quantity).toFixed(2)}</div>

                              <div className="hidden-total">{total += (product.price * item.quantity)}</div>
                          </div>

                      : null;

                  })}
                </>
                      <div>CART TOTAL = {total.toFixed(2)}</div>
              </div>
              : <div className="cup-image-container">
                  <img src='/images/empty-glass-clip-art.png' alt='empty-cup' className='cup-image'/>
                  <h1>Your Cup is Empty :droplet:</h1>
                  {noUser()}
              </div>
          }
  </div>
);

export default ShoppingCart;
