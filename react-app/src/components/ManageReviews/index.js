import React, {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import { thunkGetUserReviews } from "../../store/reviews"


const ManageReviews = () => {
    const dispatch = useDispatch()
    const {user_id} = useParams()

    const userReviews = Object.values(useSelector(state => state.productReviews.userReviews))
    console.log('--------FRONT END USER REVIEWS========', userReviews)

    useEffect(() => {
        dispatch(thunkGetUserReviews(user_id))
    }, [dispatch])

    if (!userReviews.length) return null
    return (
        <>
            <div>
                <h1>Manage Reviews</h1>
            </div>
            <div>
                {userReviews.map(review => {
                    return (
                        <>
                            <div>{review.review}</div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default ManageReviews
