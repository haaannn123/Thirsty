import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { thunkCreateProductReview } from '../../store/reviews';
import { useModal } from "../../context/Modal";

const CreateNewReview = (product) => {
    const product_id = parseInt(product.product)
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [review, setReview] = useState('');
    const [rating, setRating] = useState();
    const [errors, setErrors] = useState({});

    // useEffect(() => {
    //     dispatch()
    // }, [dispatch])



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
        history.push(`/products/${product_id}`)
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

                <button type='submit'>Create a Review</button>
            </form>
        </div>
    )

}

export default CreateNewReview
