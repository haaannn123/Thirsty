const GET_PRODUCT = "product/GET_PRODUCT"

const getProduct = (id) => ({
    type: GET_PRODUCT,
    id
});

// THUNK Action creator
export const fetchProduct = (id) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}`)
    if (response.ok) {
        const product = await response.json()
        dispatch(getProduct(product))
        return product
    }
}


const initialState = { singleProduct: {} }

export default function singleProductReducer(state = initialState, action){
    let newState;
    switch (action.type) {
        case GET_PRODUCT:
            console.log('------ACTION-----', action)
            newState = {...state}
            console.log('-----NEWSTATE---', newState)
            newState.singleProduct = action.id
            return newState
        default:
            return state
    }
}
