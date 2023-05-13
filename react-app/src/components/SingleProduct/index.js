import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProduct } from "../../store/products";
import { thunkGetProductReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import CreateNewReview from "../CreateNewReview";
import AddToCart from "../AddToCart";
import UpdateReview from "../UpdateReview";
import { thunkGetUserReviews } from "../../store/reviews";
import DeleteReview from "../DeleteReviewModal";
import "./SingleProduct.css";

const GetSingleProduct = () => {
  const { product_id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.products.allProducts[product_id]);
  const reviews = Object.values(useSelector((state) => state.productReviews.productReviews));
  const new_review = useSelector((state) => state.productReviews.newReview);
  const user = useSelector((state) => state.session.user);
  // console.log("THIS IS THE LOG I'M LOOKING FOR", product);

  useEffect(() => {
    dispatch(fetchProduct(product_id));
    dispatch(thunkGetProductReviews(product_id));
  }, [dispatch, product_id, new_review, user]);

  if (!product || !reviews) return null;

  const userLoggedIn = (review, user_id) => {
    if (review.user_id === user_id) {
      dispatch(thunkGetUserReviews(user_id));
      return (
        <div>
          <OpenModalButton buttonText="Update your review" modalComponent={<UpdateReview reviewId={review.id} />} />
          <OpenModalButton buttonText="Delete Your Review" modalComponent={<DeleteReview reviewId={review.id} />} />
        </div>
      );
    }
  };

  const handleClick = () => {
    window.alert("Feature coming soon!");
  };

  function formatDate(created_at) {
    const dateObj = new Date(created_at);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return dateObj.toLocaleDateString("en-US", options);
  }

  function averageRating(reviews) {
    let sum = 0;
    if (reviews.length > 0) {
      reviews.forEach((review) => (sum += review.rating));
      return (sum / reviews.length).toFixed(2);
    }
    return "No Reviews";
  }

  const renderRatings = (review) => {
    const maxRating = 5;
    const ratingIcons = [];
    for (let i = 0; i < maxRating; i++) {
      if (i < review.rating) {
        ratingIcons.push(<i key={i} className="fa-solid fa-wine-glass"></i>);
      } else {
        ratingIcons.push(<i key={i} className="far fa-wine-glass"></i>);
      }
    }
    return ratingIcons;
  };


  function renderPost() {
    return reviews.find(review => review.user_id === user.id)
}

  const renderLeaveReviewButton = () => {
    if (user && product.owner_id !== user.id && !renderPost()) {
        return <OpenModalButton buttonText="Leave a Review" modalComponent={<CreateNewReview product={product_id} />} />;
    } else {
        return null
    }
  };



  return (
    <div>
      <div>
        <h1>{product.name}</h1>
        <img src={product.preview_img} alt="this is a drink!" />
        <h2>${product.price}</h2>
        <text>{product.description}</text>
        <button onClick={handleClick}>Buy it now</button>
        <AddToCart />
      </div>
      <div>
        <h2>
          {averageRating(reviews)}
          <i class="fa-solid fa-wine-glass"></i>
          {reviews.length ? <div>·</div> : null}
          {reviews.length && reviews.length === 1 ? reviews.length + " review" : ""}
          {reviews.length && reviews.length !== 1 ? reviews.length + " reviews" : ""}
        </h2>
        {renderLeaveReviewButton()}
        {reviews.map((review) => {
          return (
            <div key={review.id} className="review-body">
              <div>
                <div>{renderRatings(review)}</div>

                <div>{review.review}</div>
              </div>
              <div>
                <div>{review.User_info.username}</div>
                <div>{formatDate(review.created_at)}</div>
              </div>
              {user ? <div>{userLoggedIn(review, user.id)}</div> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GetSingleProduct;
