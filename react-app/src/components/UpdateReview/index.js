import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { thunkCreateProductReview } from '../../store/reviews';
import { useModal } from "../../context/Modal";

const UpdateReview = (product) => {
    const product_id = parseInt(product.product)
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const previousReview = useSelector(state => state.productReviews.userReviews)
    const user = useSelector(state => state.session.user)
    const previousReviewArr = Object.values(previousReview)[0]
    console.log('---------UPDATE REVIEW------', previousReviewArr)


    const [review, setReview] = useState(previousReviewArr.review);
    const [rating, setRating] = useState(previousReviewArr.rating);
    const [errors, setErrors] = useState({});


    if (!previousReview) return null



    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const userReview = {
            review,
            rating
        }


        let newReview = await dispatch(thunkCreateProductReview(product_id, userReview))
        // .catch(
        //     async (res) => {
        //         const data = await res.json();
        //         console.log(data)
        //         if (data && data.errors) setErrors(data.errors);
        //     }
        // );
        console.log('--------NEW REVIEW FE-------', newReview)
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
