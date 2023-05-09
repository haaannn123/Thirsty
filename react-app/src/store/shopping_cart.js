const ADD_TO_CART = "cart/ADD_TO_CART"
const GET_USER_CART = "cart/GET_USER_CART"

export const actionAddToCart = (product) => ({
    type: ADD_TO_CART,
    product
})

export const actionGetUserCart = (userId) => ({
    type: GET_USER_CART,
    userId
})

const normalizeCarts = (carts) => {
    let normalizedCarts = {};
    carts.carts.forEach(cart => {
        normalizedCarts[cart.id] = cart
    });
    return normalizedCarts
}

export const getCartThunk = () => async dispatch => {
    const response = await fetch (`/api/cart/`)
    console.log('RESPONSE->', response)

    if (response.ok) {
        const cart = await response.json()
        const normalizedCart = normalizeCarts(cart)
        // console.log('CART->', normalizedCart)
        dispatch(actionGetUserCart(normalizedCart))
        return normalizedCart
    }
}

// export const thunkAddToCart = (productId, userId) => async dispatch => {

// }

const initialState = { userCart: {} }

export default function cartReducer (state = initialState, action) {
    let newState;
    switch(action.type) {
        case GET_USER_CART:
            newState = { ...state }
            newState.userCart = action.userId
            return newState
        default:
            return state
    }
}
