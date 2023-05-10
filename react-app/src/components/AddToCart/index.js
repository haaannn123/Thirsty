import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
// import { fetchProduct } from '../../store/single_product'
import { getCartThunk, thunkAddToCart } from '../../store/shopping_cart'

const AddToCart = () => {
    const { product_id }  = useParams()
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.userCart)
    console.log('CART====>', cart)
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(getCartThunk())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            window.alert("Please Log in or Sign Up to shop! :)")
            return
        }

        const product = {
            user_id : user.id,
            product_id: product_id,
            // quantity: 4,
        }
        dispatch(thunkAddToCart(product))
    }

    return(
        <button onClick={handleSubmit}>Add to Cart</button>
    )
}

export default AddToCart;
