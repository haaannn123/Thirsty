import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {fetchUserProducts}  from '../../store/products';
import OpenModalButton from '../OpenModalButton';
import DeleteProduct from '../DeleteProduct';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import OpenDeleteProductModal from '../OpenDeleteProductModal'

import './productsofcurrentuser.css'
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
        <div className="store-product-container">

            {productsArr.map((product) => {
                return (
                    <div className="store-product-card">
                    <NavLink to={`/products/${product.id}`} className="store-product-link">
                        <img src={product.preview_img} alt="this is of a drink!!" className='store-product-image'/>
                        <h2 className="store-product-name">{product.name}</h2>
                    </NavLink>
                      <div className="product-edit-delete">
                        <OpenDeleteProductModal
                        buttonText="Delete"
                        className="store-delete-button"
                        modalComponent={<DeleteProduct productId={product.id}
                         />}
                        />
                        <NavLink to={`/products/${product.id}/edit`} >
                            <i class="fa-solid fa-pen"></i>
                            <button className="store-edit-button">Edit Product</button>
                        </NavLink>
                      </div>
                    </div>
                )
            })}

        </div>
    )
}

export default ProductOfCurrentUser
