import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchProduct } from '../../store/products'
import { thunkGetProductReviews } from '../../store/reviews'
import OpenModalButton from "../OpenModalButton";
import CreateNewReview from '../CreateNewReview'
import AddToCart from '../AddToCart'
import UpdateReview from '../UpdateReview'
import { thunkGetUserReviews } from '../../store/reviews'
import DeleteReview from '../DeleteReviewModal'

// import { CreateNewReview}

const GetSingleProduct = () => {
    const {product_id}  = useParams()
    const dispatch = useDispatch()

    const product = useSelector((state) => state.products.allProducts[product_id])
    const reviews = Object.values(useSelector(state => state.productReviews.productReviews))
    const new_review = useSelector(state => state.productReviews.newReview)
    const user = useSelector(state => state.session.user)
    // console.log('-----SINGLE PRODUCT IN COMPONENT----', product, reviews, new_review)

    useEffect(() => {
        dispatch(fetchProduct(product_id))
        dispatch(thunkGetProductReviews(product_id))
        // dispatch(thunkGetUserReviews(user.id))
    }, [dispatch, product_id, new_review, user])

    useEffect(() => {
        dispatch(thunkGetProductReviews(product_id))
    }, [reviewState])

    if (!product || !reviews) return null

    const userLoggedIn = (review, user_id) => {
        if (review.user_id === user_id) {
        dispatch(thunkGetUserReviews(user_id))
            return (
                <div>
                    <OpenModalButton
                        buttonText="Update your review"
                        modalComponent={<UpdateReview reviewId={review.id} />}
                    />
                    <OpenModalButton
                        buttonText="Delete Your Review"
                        modalComponent={<DeleteReview reviewId={review.id} />}
                    />
                </div>
            )
        }
    }

    return (
        <div>
            <div>
                <h1>{product.name}</h1>
                <img src={product.preview_img} alt="this is a drink!" />
                <h2>{product.price}</h2>
                <text>{product.description}</text>
                <button>Buy it now</button>
                <AddToCart />
            </div>
            <div>
                <h2>Reviews</h2>
                <OpenModalButton
                    buttonText="Leave a Review"
                    modalComponent={<CreateNewReview product={product_id} />}
                />
                {reviews.map(review =>
                    {
                    return (
                        <div key={review.id}>
                            <div>
                                <div>{review.rating}</div>
                                <div>{review.review}</div>
                            </div>
                            <div>
                                <div>{review.User_info.username}</div>
                                <div>{review.created_at}</div>
                            </div>
                            {user ?
                                <div>
                                    {userLoggedIn(review, user.id)}
                                </div>
                                :
                                null
                            }
                        </div>
                    )
                    })}
            </div>
        </div>
    )
}

export default GetSingleProduct
