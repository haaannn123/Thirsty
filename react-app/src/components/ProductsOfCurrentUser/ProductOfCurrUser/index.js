import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import  {fetchUserProducts}  from '../../../store/products';

const ProductOfCurrentUser = () => {
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.userProducts)
    const productsArr = Object.values(products)
    console.log('HI PRODUCTS HERE!!!', products)

    useEffect(() => {
        dispatch(fetchUserProducts())
    }, [dispatch])

    return (
        <div>
            {productsArr.map((product) => {
                return (
                    <>
                    <img src={product.preview_img} alt="this is of a drink!!"/>
                    <h2>{product.name}</h2>
                    </>
                )
            })}
        </div>
    )
}

export default ProductOfCurrentUser
