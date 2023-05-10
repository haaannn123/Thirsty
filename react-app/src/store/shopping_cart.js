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

export const thunkAddToCart = (productId, cartId) => async dispatch => {
    const response = await fetch (`/api/cart/${cartId}/product/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cart_id: cartId, productId: productId})
    })

    if (response.ok) {
        const product = await response.json();
        dispatch(actionAddToCart(product))
        return product
    }
}

const initialState = { userCart: {}, products: {} }

export default function cartReducer (state = initialState, action) {
    let newState;
    switch(action.type) {
        case GET_USER_CART:
            newState = { ...state }
            newState.userCart[action.userId] = action.userId
            return newState
        case ADD_TO_CART:
            newState = { ...state }
            console.log('NEWSTATE', newState)
            newState.products[action.product.id] = action.product
            return newState
        default:
            return state
    }
}
