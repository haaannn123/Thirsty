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


                {searchResultProducts.length === 0 &&
                    <div className="no-search-results-container">
                        <h2 className="no-search-results">Sorry, your search came up empty!</h2>
                        <img src='/images/empty-glass-clip-art.png' alt='empty-cup' className='search-empty-cup-image'/>
                    </div>
                }
                {searchResultProducts.map(product =>
                    {
                        return (
                            <div key={product.id} className = 'all-products-card'>
                                <NavLink to={`/products/${product.id}`} className='all-products-image-container'>
                                    <img
                                        src = {product.preview_img}
                                        alt = {`${product.name}'s image unavaiable`}
                                        className='all-products-image'
                                    >
                                    </img>
                                    <div class="all-products-price-container">
                                        <div className='all-products-price'>
                                            ${`${product.price.toFixed(2)}`}
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        )
                    })
                }
            </div>
        </>


    )
}


export default SearchResults
