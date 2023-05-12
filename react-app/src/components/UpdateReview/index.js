import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { thunkGetUserReviews, thunkUpdateUserReview } from '../../store/reviews';
import { useModal } from "../../context/Modal";

const UpdateReview = (reviewId) => {
    const review_id = parseInt(reviewId.reviewId)
    // console.log(review_id)
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const previousReviews = useSelector(state => state.productReviews.userReviews)
    const user = useSelector(state => state.session.user)
    const previousReview = previousReviews[review_id]
    // console.log('---------UPDATE REVIEW------', previousReview[review_id])


    const [review, setReview] = useState(previousReview.review);
    const [rating, setRating] = useState(previousReview.rating);
    const [errors, setErrors] = useState('');

    if (!previousReview) return null



    const handleSubmit = async (e) => {
        e.preventDefault();

        let allErrors = {}

        if (review.length < 3 || review.length > 255) allErrors.review = 'Review must be between 3 and 255 characters'

        if (Object.keys(allErrors).length) {
            return setErrors(allErrors)
        }

        const userReview = {
            review,
            rating
        }
        // console.log('--------updated REVIEW FE-------', previousReview)

        let updatedReview = await dispatch(thunkUpdateUserReview(previousReview.id, userReview))
        // console.log('--------updated REVIEW FE-------', updatedReview)
        closeModal()
        window.location.reload()
    }

    return (
        <div>
            <form method='POST' onSubmit={handleSubmit}>
                <label>Review</label>
                {errors.review ? <p>{errors.review}</p> : null}
                <input
                    type='textbox'
                    onChange={(e) => setReview(e.target.value)}
                    value={review}
                    placeholder='Please leave a review!'
                    name='review'
                />
                <label>Rating</label>
                <input
                    type='number'
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    placeholder='Rating'
                    name='rating'
                />

                <button type='submit'>Submit update</button>
            </form>
        </div>
    )

}

export default UpdateReview
