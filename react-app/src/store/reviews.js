const GET_PRODUCT_REVIEWS = "product/GET_PRODUCT_REVIEWS"
const CREATE_PRODUCT_REVIEW = "product/CREATE_PRODUCT_REVIEW"


// ACTIONS

export const actionGetProductReviews = (reviews) => ({
    type: GET_PRODUCT_REVIEWS,
    reviews
})

export const actionCreateProductReview = (new_review) => ({
    type: CREATE_PRODUCT_REVIEW,
    new_review
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


export const thunkCreateProductReview = (product_id, review) => async (dispatch) => {
    console.log('--------THUNK REVIEW, PRODUCT_ID-------', product_id, review)
    const response = await fetch(`/api/product/${product_id}/reviews/new`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const new_review = await response.json()
        console.log('--------RESPONSE THUNK-------', new_review)
        dispatch(actionCreateProductReview(new_review))
    }
}

const initialState = { productReviews: {}, newReview: {} }

const productReviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_REVIEWS:
            const getReviewState = {...state}
            getReviewState.productReviews = action.reviews
            return getReviewState

        case CREATE_PRODUCT_REVIEW:
            const createReviewState = {...state};
            createReviewState.newReview = action.new_review
            return createReviewState

        default:
            return state
    }
}


export default productReviewsReducer
