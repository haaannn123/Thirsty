import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetAllProducts } from '../../store/products';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import OpenModalButton from '../OpenModalButton';
import DeleteProduct from '../DeleteProduct';
import './products.css'


const GetAllProducts = () => {

    const dispatch = useDispatch()

    const allProducts = Object.values(useSelector(state => state.products.allProducts))



    useEffect(() => {
        dispatch(thunkGetAllProducts())
    }, [dispatch])


    if(!Object.keys(allProducts).length){
        return(
            <i className="fa-solid fa-truck-ramp-box spot-info-loading">LOADING...</i>
        )
    }

    // allProducts.map(product => {
    //     console.log(product.name)
    // })

    // const allProductsRender = () => {
    //     allProducts.map(product => {

    // }


    return (

        // <h1>All Products Page</h1>

        <div className='all-products-container'>

            {allProducts.map(product =>
                {
                    return (
                        <div>
                        <NavLink to={`/products/${product.id}`} key={product.id} className='all-products-image-container'>
                            <img
                                src = {product.preview_img}
                                alt = {`${product.name}'s image unavaiable`}
                                className='all-products-image'
                            >
                            </img>
                            <div class="all-products-price-container">
                                <div className='all-products-price'>
                                    ${`${product.price}`}
                                </div>
                            </div>
                        </NavLink>
                        <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeleteProduct productId={product.id} />}
                    />
                    </div>
                    )
                })
            }
        </div>

    )




}

export default GetAllProducts;
