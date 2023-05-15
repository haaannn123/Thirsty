import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { getCartThunk, thunkDeleteAllItemsFromCart } from "../../store/shopping_cart";

const MakeAPurchase = ({userId, totalPurchaseAmount}) => {

    const { closeModal } = useModal();
    const dispatch = useDispatch();
    // console.log("MAKE PURCHASE USER ID--------------", userId)

    const deleteAllItemsFromCart = async (e) => {
        e.preventDefault();
        await dispatch(thunkDeleteAllItemsFromCart(userId));
        await dispatch(getCartThunk())
        closeModal();
    }


return(
    <div className='delete-cart-item-container'>
        <h1 className="delete-cart-item-title">Purchase Confirmation</h1>
        <div className="delete-cart-item-text">Purchase Total: ${totalPurchaseAmount.toFixed(2)}</div>
        <div className="delete-review-submit">
            <button id='yes-delete' onClick={deleteAllItemsFromCart}>YES (PURCHASE ITEMS)</button>
            <button id='no-keep' onClick={closeModal}>NO (KEEP SHOPPING)</button>
        </div>
    </div>
)
}

export default MakeAPurchase;
