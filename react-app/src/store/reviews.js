const GET_PRODUCT_REVIEWS = "product/GET_PRODUCT_REVIEWS"
const CREATE_PRODUCT_REVIEW = "product/CREATE_PRODUCT_REVIEW"
const GET_USER_REVIEWS = "reviews/GET_USER_REVIEWS"
const DELETE_REVIEW = "reviews/DELETE_REVIEW"


// ACTIONS
export const actionGetUserReviews = (user_reviews) => ({
    type: GET_USER_REVIEWS,
    user_reviews
})

export const actionGetProductReviews = (reviews) => ({
    type: GET_PRODUCT_REVIEWS,
    reviews
})

export const actionCreateProductReview = (new_review) => ({
    type: CREATE_PRODUCT_REVIEW,
    new_review
})

export const actionDeleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
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


export const thunkGetUserReviews = (user_id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/user/${user_id}`)

    if (response.ok) {
        const reviews = await response.json()
        const normalizedReviews = normalizingAllReviews(reviews)
        console.log('----RESPONSE---', normalizedReviews)
        dispatch(actionGetUserReviews(normalizedReviews))
    }
}

export const thunkGetProductReviews = (product_id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/product/${product_id}`)

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
    const response = await fetch(`/api/reviews/new/product/${product_id}`, {
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

export const thunkDeleteReview = (reviewId) => async dispatch => {
    
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(actionDeleteReview(response))
        return response
    }
}

const initialState = { productReviews: {}, newReview: {}, userReviews: {} }

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

        case GET_USER_REVIEWS:
            const userReviewState = { ...state }
            userReviewState.userReviews = action.user_reviews
            return userReviewState
        case DELETE_REVIEW:
            const deleteState = { ...state }
            delete deleteState.userReviews[action.reviewId];
            return deleteState
        default:
            return state
    }
}


export default productReviewsReducer
