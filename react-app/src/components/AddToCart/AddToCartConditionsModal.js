import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
// import { fetchProduct } from '../../store/single_product'
import { getCartThunk, thunkAddToCart } from '../../store/shopping_cart'
import { useModal } from "../../context/Modal"
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from '../LoginFormModal';
import SignInOpenModalButton from '../SignInOpenModalButton';


const AddToCartConditions = ({user, userCartArray, product_id}) => {

    const { closeModal } = useModal();
    const dispatch = useDispatch()
    const [itemQuantityExceeded, setItemQuantityExceeded] = useState(false)
    const [hasRun,setHasRun] = useState(false)

    // if (!user) {
    //     window.alert("Please Log in or Sign Up to shop! :)")
    //     return
    // }

    console.log("CART CONDITION PARAMS", userCartArray)
    // let itemQuantityExceeded = false;

    

    const productInCart = userCartArray.find()

    if(user && !hasRun){

        if(userCartArray.length > 0){
            userCartArray.forEach(item => {
                // console.log("ITEM----------->>>", item.product_id, product_id)
                if(item.product_id == product_id){
                    console.log("ITEM QUANTITY IN CART", item.quantity)
                    if(item.quantity >= 50){
                        //window.alert("You cannot add more than 50 quantities of the same item to cart")
                        setItemQuantityExceeded(true);
                        return

                    }
                }

            })
        }

        if(itemQuantityExceeded){
            return
        };

        console.log("PRODUCT ID------------------>>>>>>", product_id)
        console.log("USER------------------>>>>>>", user)

        const product = {
            user_id : user.id,
            product_id: product_id,
            // quantity: 4,
        }

        setHasRun(true)

        if(!itemQuantityExceeded){
            console.log("UGKIUGKGGLUGYUYVKUYVKYGKYGKUYYVKYVLUVKVKUVKYVJHVHJ")
            dispatch(thunkAddToCart(product))

        }else{
            console.log("WE ARE HEREEEEEEEEEEEEEEEEEEE")
        }


        return
    }

    return(

        <div>

            {!user ? (
                    <div>
                        <div> You Must be logged in to add items to cart</div>
                        <div>
                            <SignInOpenModalButton
                                buttonText="PROCEED TO SIGN IN"
                                onItemClick={closeModal}
                                modalComponent={<LoginFormModal />}
                                className="sign-in-button"
                            />
                        </div>
                    </div>

            ) :     itemQuantityExceeded ? (
                        <div>Item quantity exceeded</div>
                    )
                     : <div>Item added successfully</div>





            }
        </div>
    )
}

export default AddToCartConditions;
