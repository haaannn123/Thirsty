import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {fetchUserProducts}  from '../../store/products';
import OpenModalButton from '../OpenModalButton';
import DeleteProduct from '../DeleteProduct';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
const ProductOfCurrentUser = () => {
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.userProducts)
    const allProducts = useSelector((state) => state.products.allProducts)
    const productsArr = Object.values(products)
    console.log('HI PRODUCTS HERE!!!', products)

    useEffect(() => {
        dispatch(fetchUserProducts())
    }, [dispatch, allProducts])



    return (
        <div>
            {productsArr.map((product) => {
                return (
                    <>
                    <img src={product.preview_img} alt="this is of a drink!!"/>
                    <h2>{product.name}</h2>
                    <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeleteProduct productId={product.id} />}
                    />
                    <NavLink to={`/products/${product.id}/edit`}>
                        <button>Edit Products</button>
                    </NavLink>
                    </>
                )
            })}
        </div>
    )
}

export default ProductOfCurrentUser
