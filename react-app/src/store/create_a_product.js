const CREATE_NEW_PRODUCT = 'products/CREATE_A_PRODUCT'

//ACTIONS

const actionCreateNewProduct = (product) => ({
    type: CREATE_NEW_PRODUCT,
    product
})

//THUNK Action Creator
export const createNewProduct = (product) => async dispatch => {
    console.log('PRODUCT-->:', JSON.stringify(product))

    const response = await fetch ('/api/products/new', {
        method: 'POST',
        body: product
    })
    console.log("RESPONSE HERE!!!::", response.json())
    if (response.ok) {

        console.log("YOOOO THIS IS HITTING")
        const newProduct = await response.json()
        console.log('NEW PRODUCT-->', newProduct)
        dispatch(actionCreateNewProduct(newProduct))
        return newProduct
    }
    // .then(response => {
    //     // console.log('Form submitted successfully!', response);
    //     const newProduct = response
    //     dispatch(actionCreateNewProduct(newProduct))
    //     console.log('NEW PRODUCT-->', newProduct)
    //   })
    //   .catch(error => {
    //     console.error('Error submitting form:', error);
    //   });
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
