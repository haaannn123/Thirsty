const DELETE_PRODUCT = 'products/DELETE_A_PRODUCT'

const actionDeleteProduct = (productId) => ({
    type: DELETE_PRODUCT,
    productId
})

export const deleteProduct = (productId) => async dispatch => {
    const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(actionDeleteProduct(productId))
        return response
    }
}

const initialState = { allProducts: {} }

const deleteProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            const newState = { ...state, allProducts: { ...state.allProducts }};
            delete newState.allProducts[action.productId];
            return newState
        default:
            return state
    }
}

export default deleteProductReducer;
