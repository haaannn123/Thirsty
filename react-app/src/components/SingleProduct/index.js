import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchProduct } from '../../store/single_product'

const GetSingleProduct = () => {
    const productId = useParams()
    const dispatch = useDispatch()

    const product = useSelector((state) => state)
    console.log('-----SINGLE PRODUCT IN COMPONENT----', product)

    useEffect(() => {
        dispatch(fetchProduct(productId))
    }, [dispatch, productId])


    return (
        <div>{product.name}</div>
    )


}

export default GetSingleProduct
