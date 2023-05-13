import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal'
import { thunkDeleteReview } from '../../store/reviews';
import './DeleteReviewModal.css'


const DeleteReview = ({reviewId}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = () => {
        dispatch(thunkDeleteReview(reviewId))
        closeModal()
        window.location.reload()
    };

    return (
        <div className='delete-review-container'>
            <h1 className='delete-review-title'>Confirm Delete</h1>
            <p className='delete-review-text'>Are you sure you want to remove this Review?</p>
            <div className='delete-review-submit'>
                <button id='yes-delete' onClick={handleSubmit}>Yes, Delete Review</button>
                <button id='no-keep' onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteReview;
