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
        // console.log("BEFORE NORMALIZE CART", cart)
        normalizedCarts[cart.id] = cart
    });

    return normalizedCarts
}


export const getCartThunk = () => async dispatch => {
    const response = await fetch (`/api/cart/`)

    if (response.ok) {
        const cart = await response.json()
        const normalizedCart = normalizeCarts(cart)
        await dispatch(actionGetUserCart(normalizedCart))
        // console.log('NORMALIZED CART:', normalizedCart)
        return normalizedCart
    }
}

export const thunkAddToCart = (product) => async dispatch => {
    // console.log("PRODUCT WENT THROUGH HERE!!:",product)
    const response = await fetch (`/api/cart/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })

    if (response.ok) {
        const cartProduct = await response.json();
        // const normalizedCartProduct = normalizeCarts(cartProduct)
        await dispatch(actionAddToCart(cartProduct))
        await dispatch(getCartThunk())
        return cartProduct;
    }
}

export const thunkUpdateCartItemQuantityInDb = (quantity, item) => async dispatch => {
    // console.log("PRODUCT WENT THROUGH HERE!!:", quantity, item)
    const response = await fetch (`/api/cart/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: quantity, item: item })
    })

    if (response.ok) {
        const cartProduct = await response.json();
        // const normalizedCartProduct = normalizeCarts(cartProduct)
        await dispatch(actionAddToCart(cartProduct))
        await dispatch(getCartThunk())
        return cartProduct;
    }
}

export const thunkDeleteItemFromCart = (item) => async dispatch => {
    const response = await fetch (`/api/cart/deleteSingleItem`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })

    if(response.ok){
        // console.log("DELETE ITEM FROM CART RESPONSE")

        await dispatch(getCartThunk())
    }
}

export const thunkDeleteAllItemsFromCart = (userId) => async dispatch => {
    const response = await fetch (`/api/cart/deleteAllItemsFromCart`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userId)
    })

    if(response.ok){
        // console.log("DELETE ALL ITEMS FROM CART RESPONSE")

        await dispatch(getCartThunk())
    }
}

const initialState = { userCart: {} }

export default function cartReducer (state = initialState, action) {
    let newState;
    switch(action.type) {
        case GET_USER_CART:
            return { ...state, userCart: {...action.userId}}
            case ADD_TO_CART:
                // console.log("ADD TO CART ACTION: ", action)
                newState = { ...state }
                newState.userCart[action.product.id] = action.product
                return newState
        default:
            return state
    }
}
