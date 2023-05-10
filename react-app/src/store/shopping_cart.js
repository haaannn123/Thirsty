const ADD_TO_CART = "cart/ADD_TO_CART"
const GET_USER_CART = "cart/GET_USER_CART"

export const actionGetUserCart = (userId) => ({
    type: GET_USER_CART,
    userId
})

export const actionAddToCart = (product) => ({
    type: ADD_TO_CART,
    product
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

    if (response.ok) {
        const cart = await response.json()
        const normalizedCart = normalizeCarts(cart)
        dispatch(actionGetUserCart(normalizedCart))
        console.log('NORMALIZED CART:', normalizedCart)
        return normalizedCart
    }
}

export const thunkAddToCart = (product) => async dispatch => {
    const response = await fetch (`/api/cart/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })

    if (response.ok) {
        const cartProduct = await response.json();
        dispatch(actionAddToCart(cartProduct))
        return cartProduct;
    }
}

const initialState = { userCart: {}, products: {} }

export default function cartReducer (state = initialState, action) {
    let newState;
    switch(action.type) {
        case GET_USER_CART:
            // newState = { ...state, userCart: {} }
            // console.log('ACTION USER:', newState)
            // newState.userCart[action.userId] = action.userId
            return { ...state, userCart: {...action.userId}}
        case ADD_TO_CART:
                newState = { ...state }
                newState.userCart[action.product] = action.product
                return newState
        default:
            return state
    }
}
