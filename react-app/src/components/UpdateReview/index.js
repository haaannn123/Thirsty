import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { thunkGetUserReviews, thunkUpdateUserReview } from '../../store/reviews';
import { useModal } from "../../context/Modal";
import './UpdateReview.css'

const UpdateReview = (reviewId) => {
    const review_id = parseInt(reviewId.reviewId)
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const previousReviews = useSelector(state => state.productReviews.userReviews);
    const user = useSelector(state => state.session.user);
    const previousReview = previousReviews[review_id];
    // console.log('---------UPDATE REVIEW------', previousReview[review_id])
    const [cups, setCups] = useState(1);
    const [reviewButton, setReviewButton] = useState();
    const [hoveredCups, setHoveredCups] = useState(1);
    const [errors, setErrors] = useState('');
    const numbers = [1, 2, 3, 4, 5];
    const [review, setReview] = useState(previousReview.review);
    const [rating, setRating] = useState(previousReview.rating);

    useEffect(() => {
        if (!cups || review.length < 3) {
            setReviewButton("review-button-disabled");
        } else {
            setReviewButton("review-button-enabled");
        }
    }, [cups, review]);

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
            rating: cups
        }
        // console.log('--------updated REVIEW FE-------', previousReview)

        let updatedReview = await dispatch(thunkUpdateUserReview(previousReview.id, userReview))
        // console.log('--------updated REVIEW FE-------', updatedReview)
        closeModal()
        window.location.reload()
    }

    const handleMouseOver = (num) => {
        setHoveredCups(num);
    };

    const handleMouseLeave = () => {
        setHoveredCups(null);
    };

    const changeClassName = (value) => {
        if (hoveredCups !== null) {
            return value <= hoveredCups
                ? "fa-solid fa-wine-glass"
                : "fa-solid fa-wine-glass-empty";
        }
        if (value <= cups) {
            return "fa-solid fa-wine-glass";
        }
        return "fa-solid fa-wine-glass-empty";
    };

    const disabledButton = () => {
        if (!cups) return true;
        return false;
    };

    return (
        <div className="update-review-container">
            <h2 className="update-review-title-header">Update Your Review</h2>
            <form onSubmit={handleSubmit} className="review-form">
                {errors.review ? <p className='update-review-errors'>{errors.review}</p> : null}
                <textarea
                    className="review-text-box"
                    type="text"
                    rows="10"
                    value={review}
                    placeholder="Leave your review here"
                    onChange={(e) => setReview(e.target.value)}
                />
                <br />
                <div className="review-cups" onMouseLeave={handleMouseLeave}>
                    {numbers.map((value) => (
                        <div key={value}>
                            <i
                                className={changeClassName(value)}
                                onMouseOver={() => handleMouseOver(value)}
                                onClick={() => setCups(value)}
                            ></i>
                        </div>
                    ))}
                </div>
                <div className="update-review-submit-container">
                    <button
                        id={reviewButton}
                        type="submit"
                        disabled={disabledButton()}
                    >
                        Update Your Review
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateReview
