import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchProduct } from '../../store/single_product'

const AddToCart = () => {

    // get product by id
    // update shopping cart table with product, user_id, product_id, and quantity
    // dispatch to backend for shopping cart table

    const { product_id }  = useParams()
    const dispatch = useDispatch()

    const product = useSelector((state) => state.singleProduct.singleProduct)
    console.log('-----SINGLE PRODUCT IN COMPONENT----', product)

    useEffect(() => {
        dispatch(fetchProduct(product_id))
    }, [dispatch, product_id])

    const handleSubmit = async (e) => {
        e.preventDefault()

        dispatch()
    }

    return(
        <button onSubmit={handleSubmit}>Add to Cart</button>
    )
}

export default AddToCart;
