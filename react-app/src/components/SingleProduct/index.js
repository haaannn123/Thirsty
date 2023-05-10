import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchProduct } from '../../store/products'
import { thunkGetProductReviews } from '../../store/reviews'
import OpenModalButton from "../OpenModalButton";
import CreateNewReview from '../CreateNewReview'


// import { CreateNewReview}

const GetSingleProduct = () => {
    const {product_id}  = useParams()
    const dispatch = useDispatch()


    const product = useSelector((state) => state.products.allProducts[product_id])
    const reviews = Object.values(useSelector(state => state.productReviews.productReviews))
    const new_review = useSelector(state => state.productReviews.newReview)
    console.log('-----SINGLE PRODUCT IN COMPONENT----', product, reviews, new_review)

    useEffect(() => {
        dispatch(fetchProduct(product_id))
        dispatch(thunkGetProductReviews(product_id))
    }, [dispatch, product_id, new_review, product])

    if (!product || !reviews) return null
    return (
        <div>
            <div>
                <h1>{product.name}</h1>
                <img src={product.preview_img} alt="this is a drink!" />
                <h2>{product.price}</h2>
                <text>{product.description}</text>
                <button>Buy it now</button>
                <button>Add to cart</button>
            </div>
            <div>
                <h2>Reviews</h2>
                <button>
                    <OpenModalButton
                        buttonText="Leave a Review"
                        modalComponent={<CreateNewReview product={product_id}/>}
                    />
                </button>
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
                        </div>
                    )
                    })}
            </div>
        </div>
    )
}

export default GetSingleProduct
