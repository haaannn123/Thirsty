import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { thunkGetSearchResultProducts } from "../../store/products";
import { NavLink } from 'react-router-dom';
import './SearchResults.css'


const SearchResults = () => {

    const {search_terms}  = useParams()

    // console.log("fdfdsfdfasfdf", search_terms);

    const dispatch = useDispatch()

    const searchResultProducts = Object.values(useSelector(state => state.products.allProducts))

    useEffect(async () => {
        await dispatch(thunkGetSearchResultProducts(search_terms))
    }, [dispatch, search_terms])

    // if(!Object.keys(searchResultProducts).length){
    //     return(
    //         <i className="fa-solid fa-truck-ramp-box spot-info-loading">LOADING...</i>
    //     )
    // }

    return (
        <>
        <h1 className="search-results-header">Search Results for "{`${search_terms}`}"</h1>
            <div className='all-products-container'>


                {searchResultProducts.length === 0 && <div className="no-search-results">There are no products that matched your search</div>}

                {searchResultProducts.map(product =>
                    {
                        return (
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
                        )
                    })
                }
            </div>
        </>


    )
}


export default SearchResults
