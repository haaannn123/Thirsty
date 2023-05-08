const GET_ALL_PRODUCTS = "products/GET_ALL_PRODUCTS"

//ACTIONS

export const actionGetAllProducts = (products) => {
    return{
        type: GET_ALL_PRODUCTS,
        products
    }
}

//NORMALIZATION FUNCTIONS

const normalizingAllProducts = (products) => {
    let normalizedProducts = {};
    // console.log("dsadasdasdsad", products)
    products.forEach(product => {
      normalizedProducts[product.id] = product;
    })
    // console.log("NORMALIZED sdsadsad", normalizedProducts)
    return normalizedProducts;
};

//THUNKS

export const thunkGetAllProducts = () => async (dispatch) => {

    const response = await fetch('/api/products');

    if(response.ok){
        const products = await response.json();
        // console.log ("sdasdasdasdad", products)
        const normalizedProducts = normalizingAllProducts(products)
        dispatch(actionGetAllProducts(normalizedProducts));
        return normalizedProducts;
    }

}

export const thunkGetSearchResultProducts = (search_terms) => async (dispatch) => {

    const response = await fetch (`/api/search/${search_terms}`);

    if (response.ok){
        const searchResultProducts = await response.json();
        const normalizedProducts = normalizingAllProducts(searchResultProducts);
        dispatch(actionGetAllProducts(searchResultProducts));
        return normalizedProducts;
    }
}


const initialState = { allProducts: {} };

//REDUCER

const allProductsReducer = (state = initialState, action) => {
    switch (action.type){

        case GET_ALL_PRODUCTS:{
            const newState = { ...state };
            newState.allProducts = action.products;
            return newState;
        }

        default: return state
    }
}

export default allProductsReducer
