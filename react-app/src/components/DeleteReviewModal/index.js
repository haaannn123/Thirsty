import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal'
import { thunkDeleteReview } from '../../store/reviews';


const DeleteReview = ({reviewId}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = () => {
        dispatch(thunkDeleteReview(reviewId))
        closeModal()
    };

    return (
        <div>
            <div>
                <h1>Confirm Delete</h1>
                <p>Are you sure you want to remove this Review?</p>
                <button id='yes-delete' onClick={handleSubmit}>Yes, Delete Review</button>
                <button id='no-keep' onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteReview;
