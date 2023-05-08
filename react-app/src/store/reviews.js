const GET_PRODUCT_REVIEWS = "product/GET_PRODUCT_REVIEWS"


// ACTIONS

export const actionGetProductReviews = (reviews) => ({
    type: GET_PRODUCT_REVIEWS,
    reviews
})

// NORMALIZE REVIEWS
const normalizingAllReviews = (reviews) => {
    let normalizedReviews = {};
    // console.log("dsadasdasdsad", products)
    reviews.forEach(review => {
        normalizedReviews[review.id] = review;
    })
    // console.log("NORMALIZED sdsadsad", normalizedProducts)
    return normalizedReviews;
};


// THUNKS

export const thunkGetProductReviews = (product_id) => async (dispatch) => {
    const response = await fetch(`/api/product/${product_id}/reviews`)

    if (response.ok) {
        const reviews = await response.json()
        // console.log('----RESPONSE---', reviews)
        const normalizedReviews = normalizingAllReviews(reviews)
        // console.log('-------THUNK REVIEWS-----', normalizedReviews)
        dispatch(actionGetProductReviews(normalizedReviews))
    }
}


const initialState = { productReviews: {} }

const productReviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_REVIEWS: {
            const newState = {...state}
            newState.productReviews = action.reviews
            return newState
        }

        default: return state
    }
}


export default productReviewsReducer
