import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { thunkDeleteItemFromCart, getCartThunk } from "../../store/shopping_cart";



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

    return(
        <div>

            <div>Are you sure you want to delete {product.name} from your cart?</div>

            <button onClick={deleteItem}>YES (DELETE ITEM)</button>
            <button onClick={closeModal}>NO (KEEP ITEM)</button>
        </div>

    )
}

export default DeleteCartItem
