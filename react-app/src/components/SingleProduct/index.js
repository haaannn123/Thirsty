import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchProduct } from '../../store/single_product'
import AddToCart from '../AddToCart'

const GetSingleProduct = () => {
    const {product_id}  = useParams()
    const dispatch = useDispatch()

    const product = useSelector((state) => state.singleProduct.singleProduct)
    console.log('-----SINGLE PRODUCT IN COMPONENT----', product)

    useEffect(() => {
        dispatch(fetchProduct(product_id))
    }, [dispatch, product_id])

    return (
        <div>
            <h1>{product.name}</h1>
            <img src={product.preview_img} alt="this is a drink!"/>
            <h2>{product.price}</h2>
            <text>{product.description}</text>
            <button>Buy it now</button>
            <AddToCart />
            <h1>Hello</h1>
        </div>
    )
}

export default GetSingleProduct
