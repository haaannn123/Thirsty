import { useDispatch } from "react-redux";
import { deleteProduct } from "../../store/delete_a_product";
import { useModal } from '../../context/Modal'
import './DeleteProduct.css';

const DeleteProduct = ({ productId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // console.log('PRODUCTID', productId)
    const handleSubmit = () => {
        dispatch(deleteProduct(productId))
        closeModal()
    };

    return (
        <div>
            <div>
                <h1>Confirm Delete</h1>
                <p>Are you sure you want to remove this Product?</p>
                <button id='yes-delete' onClick={handleSubmit}>Yes, Delete</button>
                <button id='no-keep' onClick={closeModal}>No Return</button>
            </div>
        </div>
    );
};

export default DeleteProduct;
