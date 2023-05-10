const GET_ALL_PRODUCTS = "products/GET_ALL_PRODUCTS"
const GET_USER_PRODUCTS = "products/GET_USER_PRODUCTS"
const EDIT_USER_PRODUCTS = "products/EDIT_USER_PRODUCTS"
const GET_PRODUCT = "product/GET_PRODUCT"
const CREATE_NEW_PRODUCT = 'products/CREATE_A_PRODUCT'
const DELETE_PRODUCT = 'products/DELETE_A_PRODUCT'

//ACTIONS
export const actionGetAllProducts = (products) => {
    return{
        type: GET_ALL_PRODUCTS,
        products
    }
}

export const getProduct = (id) => ({
    type: GET_PRODUCT,
    id
});

export const actionCreateNewProduct = (product) => ({
    type: CREATE_NEW_PRODUCT,
    product
})

export const actionDeleteProduct = (productId) => ({
    type: DELETE_PRODUCT,
    productId
})

export const actionGetUserProducts = (products) => {
    return {
        type: GET_USER_PRODUCTS,
        products
    }
}

export const actionEditUserProducts = (products) => {
    return {
        type: EDIT_USER_PRODUCTS,
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

export const fetchProduct = (id) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}`)
    if (response.ok) {
        const product = await response.json()
        dispatch(getProduct(product))
        return product
    }
}

export const createNewProduct = (product) => async dispatch => {
    console.log('PRODUCT-->:', product)
    const response = await fetch('/api/products/new', {
        method: 'POST',
        body: product
    })
    if (response.ok) {
        const newProduct = await response.json()
        console.log('NEW PRODUCT-->', newProduct)
        dispatch(actionCreateNewProduct(newProduct))
        return newProduct
    }
}

export const deleteProduct = (productId) => async dispatch => {
    const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(actionDeleteProduct(productId))
        return response
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

export const editProduct = (product, productId) => async dispatch => {
    const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        body: product
    })
    if (response.ok) {
        const updatedProduct = await response.json()
        dispatch(actionEditUserProducts(updatedProduct))
        return updatedProduct
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


const initialState = { allProducts: {}, userProducts:{}, singleProduct: {} };

//REDUCER

const allProductsReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_ALL_PRODUCTS:{
            const newState = { ...state };
            newState.allProducts = action.products;
            return newState;
        }
        case GET_PRODUCT:{
            console.log("STATEEEEEEEEEEEEEEEE", state )
            const newState = { ...state, allProducts: {...state.allProducts} };
            console.log('------ACTION-----', action)
            console.log('-----NEWSTATE---', newState)
            newState.singleProduct = action.id
            return newState
        }
        case CREATE_NEW_PRODUCT:{
            const newState = { ...state, allProducts: {...state.allProducts} }
            console.log('action ->', action)
            console.log('NEWSTATE-->', newState)
            newState.allProducts[action.product.id] = action.product
            return newState
        }
        case DELETE_PRODUCT:{
            console.log('------ACTION-----', action)
            const newState = { ...state, allProducts: { ...state.allProducts }};
            console.log('-----NEWSTATE---', newState)
            delete newState.allProducts[action.productId];
            return newState
        }
        case GET_USER_PRODUCTS:{
            const newState = {...state}
            console.log('ACTION:', action)
            newState.userProducts = action.products
            return newState;
        }
        case EDIT_USER_PRODUCTS:{
            const newState = {...state}
            newState.allProducts[action.products] = action.products;
            return newState;
        }

        default: return state
    }
}

export default allProductsReducer
