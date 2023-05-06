const GET_PRODUCT = "product/GET_PRODUCT"

const getProduct = (id) => ({
    type: GET_PRODUCT,
    id
});

// THUNK Action creator
export const fetchProduct = (id) => async (dispatch) => {
    console.log('yooo this is hitting')
    const response = await fetch(`/api/products/${id}`)
    console.log("----RESPONSE", response)
    if (response.ok) {
        const product = await response.json()
        console.log('-----PRODUCT----', product)
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
