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
    <div>
        <div>PURCHASE CONFIRMATION</div>
        <div>PURCHASE TOTAL: ${totalPurchaseAmount.toFixed(2)}</div>
        <button onClick={deleteAllItemsFromCart}>YES (PURCHASE ITEMS)</button>
        <button onClick={closeModal}>NO (KEEP SHOPPING)</button>
    </div>
)
}

export default MakeAPurchase;
