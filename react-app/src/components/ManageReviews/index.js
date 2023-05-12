import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetUserReviews } from "../../store/reviews";
import "./ManageReviews.css";
import OpenDeleteModal from "../OpenDeleteModal";
import OpenUpdateModal from '../OpenUpdateModal';
import DeleteReview from "../DeleteReviewModal";
import UpdateReview from "../UpdateReview";
const ManageReviews = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const userReviews = Object.values(useSelector((state) => state.productReviews.userReviews));
  const sessionUser = useSelector((state) => state.session.user);
  const products = useSelector((state) => state.products.allProducts);
  const productsArr = Object.values(products);

  useEffect(() => {
    dispatch(thunkGetUserReviews(sessionUser.id));
  }, [dispatch, sessionUser.id]);

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

  const renderDate = (review) => {
    const date = new Date(review.created_at);
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  if (!userReviews.length) return null;
  return (
    <>
      <div className="shop-reviews-container">
        {userReviews.map((review) => {
          return (
            <div className="shop-reviews-child">
              <div className="shop-reviews-content">
                {productsArr.map((product) => {
                  if (review.product_id === product.id) {
                    return <img src={product.preview_img} alt="drinkity dinkity" className="shop-review-image" />;
                  }
                })}
                <div className="rating-date">
                  <div className="shop-date">{renderDate(review)}</div>
                  <div className="shop-ratings">{renderRatings(review)}</div>
                  <p className="review-text">{review.review}</p>
                  <div className="shop-update-delete">
                    <OpenDeleteModal buttonText="Delete" onItemClick={closeMenu} modalComponent={<DeleteReview reviewId={review.id}/>} id="shopDelete"/>
                    <OpenUpdateModal buttonText="Edit" onItemClick={closeMenu} modalComponent={<UpdateReview reviewId={review.id}/>} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ManageReviews;
