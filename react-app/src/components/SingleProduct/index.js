import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProduct } from "../../store/products";
import { thunkGetProductReviews } from "../../store/reviews";
import OpenLeaveAReviewButton from "../OpenLeaveAReviewModal";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import CreateNewReview from "../CreateNewReview";
import AddToCart from "../AddToCart";
import UpdateReview from "../UpdateReview";
import { thunkGetUserReviews } from "../../store/reviews";
import DeleteReview from "../DeleteReviewModal";
import "./SingleProduct.css";
import { thunkAddToCart } from "../../store/shopping_cart";

const GetSingleProduct = () => {
  const { product_id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [count, setCount] = useState(1);


  const product = useSelector((state) => state.products.allProducts[product_id]);
  const reviews = Object.values(useSelector((state) => state.productReviews.productReviews));
  const new_review = useSelector((state) => state.productReviews.newReview);
  const user = useSelector((state) => state.session.user);
  const userCartArray = Object.values(useSelector((state) => state.userCart.userCart))
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
        <div className="c-product-user-review-interact">
          <OpenLeaveAReviewButton buttonText="Update your review" modalComponent={<UpdateReview reviewId={review.id} />} />
          <OpenLeaveAReviewButton buttonText="Delete Your Review" modalComponent={<DeleteReview reviewId={review.id} />} />
        </div>
      );
    }
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
      return "average rating " + (sum / reviews.length);
    }
    return "No Reviews";
  }

  const renderRatings = (review) => {
    const maxRating = 5;
    const ratingIcons = [];
    for (let i = 0; i < maxRating; i++) {
      if (i < review.rating) {
        ratingIcons.push(<i key={i} className="fa-solid fa-wine-glass c-product-indivrating"></i>);
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
      return <OpenLeaveAReviewButton className="c-product-leavereview" buttonText="Leave a Review" modalComponent={<CreateNewReview product={product_id} />} />;
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

  const renderReviews = (numReviews) => {
    if (numReviews === 1){
        return numReviews + ' rating'
    } else{
        return numReviews + ' ratings'
    }
  };

  const handleClick = (count) => {

    if (!user) {
      window.alert("Please Log in or Sign Up to shop! :)")
      return
    }


    // console.log("USER CART ARRAY-------------", userCartArray)

    let itemQuantityExceeded = false;

    if (userCartArray.length > 0) {
      userCartArray.forEach(item => {
        // console.log("ITEM----------->>>", item.product_id, product_id)
        if (item.product_id === parseInt(product_id)) {
          // console.log("ITEM QUANTITY IN CART", item.quantity)
          if (item.quantity >= 50 || (item.quantity + parseInt(count)) > 50) {
            window.alert("You cannot add more than 50 quantities of the same item to cart")
            itemQuantityExceeded = true;
            return

          }
        }

      })
    }

    if (itemQuantityExceeded) {
      return
    };

    const payload = {
      user_id: user.id,
      product_id: product_id,
      quantity: parseInt(count)
    }

    dispatch(thunkAddToCart(payload))
    history.push('/cart')
  };

  const renderBuyButtons = () => {
    if (product.owner_id !== user.id) {
      return (
        <div className="c-product-purchase">
          <div>
            <button onClick={() => handleClick(count)} className="c-product-buynow">Buy it now</button>
          </div>
          <div>
            <AddToCart quantity={count} />
          </div>
        </div>
      )
    } else {
      return (
        <>
          <button onClick={() => history.push('/shops/current')} className="c-product-addcart">Manage Product</button>
        </>
      )
    }
  };

  return (
    <div className="c-single-product">

      <div className="c-product-info-block">

        <div className="c-product-info-left">
          <img src={product.preview_img} alt="this is a drink!" className="c-product-image" />
        </div>

        <div className="c-product-info-right">
          <div>
            <h1>${product.price.toFixed(2)}</h1>
            <h1 className="single-product-name">{product.name}</h1>
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

          {user ?
            renderBuyButtons()
            :
            <div className="c-product-purchase">
              <div>
                <OpenModalButton
                  buttonText="Buy it now"
                  modalComponent={<LoginFormModal />}
                  className="c-product-buynow"
                />
              </div>
              <div>
                <OpenModalButton
                  buttonText="Add to cart"
                  modalComponent={<LoginFormModal />}
                  className="c-product-addcart"
                />
              </div>
            </div>
          }
        </div>

      </div>

      <div>
        <h2 className="c-product-description-header">Drink Description</h2>
        <div className="c-product-description">
          {product.description}
        </div>
      </div>

      <div className="c-product-reviews-block">

        <div className="c-product-reviews-header">
          <div className="all-ratings">
            <h2>{renderReviews(reviews.length)}</h2>
            •
            <h2
              className="average-rating">{averageRating(reviews)}
              <i className="fa-solid fa-wine-glass c-product-avgrating"></i></h2>
          </div>
          <div>
            {renderLeaveReviewButton()}
          </div>
        </div>

        <div className="c-product-reviews-list">
          {reviews.reverse().map((review) => {
            return (
              <div key={review.id} className="c-product-user-review-block">
                <div>
                  <div className="c-product-review-icons">{renderRatings(review)}</div>
                </div>
                <div className="c-product-user-review">
                  {review.review}
                </div>
                <div>
                  <div>By {review.User_info.username}</div>
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
