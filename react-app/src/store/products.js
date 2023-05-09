const GET_ALL_PRODUCTS = "products/GET_ALL_PRODUCTS"
const GET_USER_PRODUCTS = "products/GET_USER_PRODUCTS"


//ACTIONS
export const actionGetAllProducts = (products) => {
    return{
        type: GET_ALL_PRODUCTS,
        products
    }
}

export const actionGetUserProducts = (products) => {
    return {
        type: GET_USER_PRODUCTS,
        products
    }
}

//NORMALIZATION FUNCTIONS
const normalizingAllProducts = (products) => {
    let normalizedProducts = {};
    products.forEach(product => {
      normalizedProducts[product.id] = product;
    })
    return normalizedProducts;
};

const normalizingUserProducts = (products) => {
    let normalizedProducts = {};
    products.products.forEach(product => {
      normalizedProducts[product.id] = product;
    })
    return normalizedProducts;
};

//THUNKS
export const thunkGetAllProducts = () => async (dispatch) => {
    const response = await fetch('/api/products/');

    if(response.ok){
        const products = await response.json();
        // console.log ("sdasdasdasdad", products)
        const normalizedProducts = normalizingAllProducts(products)
        dispatch(actionGetAllProducts(normalizedProducts));
        return normalizedProducts;
    }
}

export const fetchUserProducts = () => async (dispatch) => {
    const res = await fetch('/api/products/current')

    if (res.ok){
        const products = await res.json();
        console.log("all products here!!!", products)
        const normalizedProducts = normalizingUserProducts(products)
        dispatch(actionGetUserProducts(normalizedProducts))
        return normalizedProducts
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


const initialState = { allProducts: {}, userProducts:{} };

//REDUCER

const allProductsReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_ALL_PRODUCTS:{
            const newState = { ...state };
            newState.allProducts = action.products;
            return newState;
        }
        case GET_USER_PRODUCTS:{
            const newState = {...state}
            console.log('ACTION:', action)
            newState.userProducts = action.products
            return newState;
        }
        default: return state
    }
}

export default allProductsReducer
