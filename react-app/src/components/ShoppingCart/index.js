import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk } from "../../store/shopping_cart";
import { thunkGetAllProducts } from "../../store/products";
import './ShoppingCart.css';

const ShoppingCart = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const products = useSelector((state) => state.products.allProducts)
    const productsArr = Object.values(products)
    // console.log('PRODUCTS-->', productsArr)
    const userCart = useSelector((state) => state.shoppingCart.userCart)
    const userCartArr = Object.values(userCart)
    // console.log('USER CART-->', userCartArr)

    useEffect(() => {
        dispatch(getCartThunk());
        dispatch(thunkGetAllProducts())
    }, [dispatch]);

    return (
        <div className='shopping-cart-container'>
            <h1>Shopping Cart</h1>
            {user && userCartArr.length ?
                <div>
                    {userCartArr.map(item => {
                        const product = productsArr.find(product => item.product_id === product.id);
                        return product ?
                            <div>
                                <div>{product.name}</div>
                                <img
                                    src={product.preview_img}
                                    alt={`${product.name}'s unavaiable`}
                                />
                            </div>
                        : null;
                    })}
                </div>
                : <div className="cup-image-contaœiner">
                    <img src='/images/empty-glass-clip-art.png' alt='empty-cup' className='cup-image'/>
                    <h1>Your Cup is Empty 💧</h1>
                </div>
            }
        </div>
    );
}

export default ShoppingCart;
