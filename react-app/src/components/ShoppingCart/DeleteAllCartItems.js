import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { getCartThunk } from "../../store/shopping_cart";


const DeleteAllCartItems = ({product, cartItem}) => {

    const { closeModal } = useModal();
    const dispatch = useDispatch();
    // console.log("ITEM--------------", cartItem)

    const deleteItem = async (e) => {
        e.preventDefault();
        // await dispatch(thunkDeleteAllItemsFromCart(cartItem));
        await dispatch(getCartThunk())
        closeModal();
    }


return(
    <div>
        <div>Are you sure you want to delete all items from your cart?</div>
        <button onClick={deleteItem}>YES (DELETE ALL ITEM)</button>
        <button onClick={closeModal}>NO (KEEP ALL ITEMS)</button>
    </div>
)
}

export default DeleteAllCartItems;
