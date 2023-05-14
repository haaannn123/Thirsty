import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
// import { fetchProduct } from '../../store/single_product'
import { getCartThunk, thunkAddToCart } from '../../store/shopping_cart'
import OpenModalButton from "../OpenModalButton";
import AddToCartConditions from './AddToCartConditionsModal';

const AddToCart = () => {
    const { product_id }  = useParams()
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.userCart)
    console.log('CART====>', cart)
    const userCartArray = Object.values(useSelector((state) => state.userCart.userCart))
    const user = useSelector((state) => state.session.user)
    const history = useHistory()


    useEffect(() => {
        dispatch(getCartThunk())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()






        // console.log("USER CART ARRAY-------------", userCartArray)

        // let itemQuantityExceeded = false;

        // if(userCartArray.length > 0){
        //     userCartArray.forEach(item => {
        //         // console.log("ITEM----------->>>", item.product_id, product_id)
        //         if(item.product_id == product_id){
        //             // console.log("ITEM QUANTITY IN CART", item.quantity)
        //             if(item.quantity == 50){
        //                 window.alert("You cannot add more than 50 quantities of the same item to cart")
        //                 itemQuantityExceeded = true;
        //                 return

        //             }
        //         }

        //     })
        // }

        // if(itemQuantityExceeded){
        //     return
        // };

        // const product = {
        //     user_id : user.id,
        //     product_id: product_id,
        //     // quantity: 4,
        // }

        // dispatch(thunkAddToCart(product))
        // return history.push('/cart')

    }

    return(
        // <button onClick={handleSubmit}>Add to Cart</button>
        <div>
            <OpenModalButton
                buttonText="ADD TO CART"
                modalComponent={<AddToCartConditions user={user} userCartArray={userCartArray} product_id={product_id}/>}

            />

        </div>
    )
}

export default AddToCart;
