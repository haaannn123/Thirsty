import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchProduct } from '../../store/single_product'

const GetSingleProduct = () => {
    const {product_id}  = useParams()
    console.log("PRODUCT ID HERE!!!!!:", product_id)
    const dispatch = useDispatch()

    const product = useSelector((state) => state.singleProduct.singleProduct)
    console.log('-----SINGLE PRODUCT IN COMPONENT----', product)

    useEffect(() => {
        dispatch(fetchProduct(product_id))
    }, [dispatch, product_id])


    return (
        <div>{product.name}</div>
    )


}

export default GetSingleProduct
