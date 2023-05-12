import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"


const DeleteCartItem = ({product, cartItem}) => {

    const { closeModal } = useModal();
    const dispatch = useDispatch();
    console.log("ITEM--------------", cartItem)

    const deleteItem = (e) => {
        e.preventDefault();
        //dispatch(thunkDeleteItemFromCart(item));
        closeModal();
    }

    return(
        <div>
            <div>Are you sure you want to delete {product.name}?</div>
            <button onClick={deleteItem}>YES (DELETE ITEM)</button>
            <button onClick={closeModal}>NO (KEEP ITEM)</button>
        </div>

    )
}

export default DeleteCartItem
