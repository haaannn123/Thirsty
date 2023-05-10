import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
// import { fetchProduct } from '../../store/single_product'
import { getCartThunk, thunkAddToCart } from '../../store/shopping_cart'

const AddToCart = () => {
    // get product by id
    // update shopping cart table with product, user_id, product_id, and quantity
    // dispatch to backend for shopping cart table
    const { product_id }  = useParams()
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.shoppingCart.userCart)
    console.log('CART', cart)
    // console.log('CARTID', cart.id)
    // const product = useSelector((state) => state.singleProduct.singleProduct)
    // console.log('-----SINGLE PRODUCT IN COMPONENT----', product)

    useEffect(() => {
        dispatch(getCartThunk())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(thunkAddToCart(product_id, cart.id))
    }

    return(
        <button onClick={handleSubmit}>Add to Cart</button>
    )
}

export default AddToCart;
