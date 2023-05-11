import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { thunkUpdateUserReview } from '../../store/reviews';
import { useModal } from "../../context/Modal";

const UpdateReview = (product) => {
    const product_id = parseInt(product.product)
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const previousReview = useSelector(state => state.productReviews.userReviews)
    const user = useSelector(state => state.session.user)
    const previousReviewObj = Object.values(previousReview)[0]
    // console.log('---------UPDATE REVIEW------', previousReviewObj)


    const [review, setReview] = useState(previousReviewObj.review);
    const [rating, setRating] = useState(previousReviewObj.rating);
    const [errors, setErrors] = useState({});

    useEffect(() => {

    }, [previousReview])


    if (!previousReview) return null



    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const userReview = {
            review,
            rating
        }
        console.log('--------updated REVIEW FE-------', previousReviewObj)

        let updatedReview = await dispatch(thunkUpdateUserReview(previousReviewObj.id, userReview))
        // .catch(
        //     async (res) => {
        //         const data = await res.json();
        //         console.log(data)
        //         if (data && data.errors) setErrors(data.errors);
        //     }
        // );
        console.log('--------updated REVIEW FE-------', updatedReview)
        closeModal()
        // history.push(`/products/${product_id}`)
    }

    return (
        <div>
            <form method='POST' onSubmit={handleSubmit}>
                <label>Review</label>
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
