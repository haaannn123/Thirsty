const CREATE_NEW_PRODUCT = 'products/CREATE_A_PRODUCT'

//ACTIONS

const actionCreateNewProduct = (product) => ({
    type: CREATE_NEW_PRODUCT,
    product
})

//THUNK Action Creator
export const createNewProduct = (product) => async dispatch => {
    console.log('PRODUCT-->:', product)
    const response = await fetch ('/api/products/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    })
    if (response.ok) {
        const newProduct = await response.json()
        console.log('NEW PRODUCT-->', newProduct)
        dispatch(actionCreateNewProduct(newProduct))
        return newProduct
    }
}

const initialState = { newProduct: {} }

export default function newProductReducer(state = initialState, action){
    let newState;
    switch(action.type) {
        case CREATE_NEW_PRODUCT:
            newState = { ...state, newProduct: {} }
            console.log('action ->', action)
            console.log('NEWSTATE-->', newState)
            newState.newProduct = action.product
            return newState
        default:
            return state;
    }
}
