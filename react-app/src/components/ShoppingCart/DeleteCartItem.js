import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { thunkDeleteItemFromCart, getCartThunk } from "../../store/shopping_cart";
import './DeleteCartItem.css'


const DeleteCartItem = ({product, cartItem}) => {

    const { closeModal } = useModal();
    const dispatch = useDispatch();
    // console.log("ITEM--------------", cartItem)

    const deleteItem = async (e) => {
        e.preventDefault();
        await dispatch(thunkDeleteItemFromCart(cartItem));
        await dispatch(getCartThunk())

        closeModal();
    }

    return (
        <div className='delete-cart-item-container'>
            <h1 className="delete-cart-item-title">Confirm Delete</h1>
            <p className="delete-cart-item-text">Are you sure you want to delete {product.name} from your cart?</p>
            <div className="delete-review-submit">
                <button id='yes-delete' onClick={deleteItem}>YES (DELETE ITEM)</button>
                <button id='no-keep' onClick={closeModal}>NO (KEEP ITEM)</button>
            </div>
        </div>

    )
}

export default DeleteCartItem
