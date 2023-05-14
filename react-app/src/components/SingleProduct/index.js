import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
  const [count, setCount] = useState(1);


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
      return "Average rating " + (sum / reviews.length);
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

  const options = [];
  for (let i = 1; i <= 50; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }



  return (
    <div className="c-single-product">

      <div className="c-product-info-block">

        <div className="c-product-info-left">
          <img src={product.preview_img} alt="this is a drink!" className="c-product-image" />
        </div>

        <div className="c-product-info-right">
          <div>
            <h1>${product.price}</h1>
            <h1>{product.name}</h1>
            <div className="c-product-owner">
              Sold by {product.owner_info}
            </div>
          </div>

          <div className="c-product-quantity-block">
            <h2>How thirsty are you?</h2>
            <div>
              <select value={count} onChange={((e) => setCount(e.target.value))} className="c-product-quantity">
                {options}
              </select>
            </div>
          </div>

          <div className="c-product-purchase">
            <div>
              <button onClick={handleClick} className="c-product-buynow">Buy it now</button>
            </div>
            <div>
              <AddToCart quantity={count}/>
            </div>
          </div>
        </div>

      </div>

      <div>
        <h2>
          <div className="c-product-avgrating-block">
            <div>
              {averageRating(reviews)}
            </div>
            <div>
              <i className="fa-solid fa-wine-glass c-product-avgrating"></i>
            </div>
          </div>
        </h2>
        <h2 className="c-product-description-header">Drink Description</h2>
        <div className="c-product-description">
          {product.description}
        </div>
      </div>

      <div className="c-product-reviews-block">

        <div className="c-product-reviews-header">
          <h2>
            Reviews
          </h2>
          {reviews.length ? <h2>·</h2> : null}
          {reviews.length ? <h2>({reviews.length})</h2> : null}
          <div>
            {renderLeaveReviewButton()}
          </div>
        </div>

        <div className="c-product-reviews-list">
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

    </div>
  );
};

export default GetSingleProduct;
