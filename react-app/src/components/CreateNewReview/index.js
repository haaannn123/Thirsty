import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { thunkCreateProductReview } from '../../store/reviews';
import { useModal } from "../../context/Modal";

const CreateNewReview = (product) => {
    const product_id = parseInt(product.product)
    // const dispatch = useDispatch();
    // const history = useHistory();
    // const { closeModal } = useModal();
    // const [review, setReview] = useState('');
    // const [rating, setRating] = useState();
    // const [errors, setErrors] = useState({});

    // // useEffect(() => {
    // //     dispatch()
    // // }, [dispatch])



    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setErrors({});

    //     const userReview = {
    //         review,
    //         rating
    //     }


    //     let newReview = await dispatch(thunkCreateProductReview(product_id, userReview))
    //         // .catch(
    //         //     async (res) => {
    //         //         const data = await res.json();
    //         //         console.log(data)
    //         //         if (data && data.errors) setErrors(data.errors);
    //         //     }
    //         // );
    //     console.log('--------NEW REVIEW FE-------', newReview)
    //     closeModal()
    //     // history.push(`/products/${product_id}`)
    // }

    // return (
    //     <div>
    //         <form method='POST' onSubmit={handleSubmit}>
    //             <label>Review</label>
    //             <input
    //             type='textbox'
    //             onChange={(e) => setReview(e.target.value)}
    //             value={review}
    //             placeholder='Please leave a review!'
    //             name='review'
    //             />
    //             <label>Rating</label>
    //             <input
    //             type='number'
    //             onChange={(e) => setRating(e.target.value)}
    //             value={rating}
    //             placeholder='Rating'
    //             name='rating'
    //             />

    //             <button type='submit'>Create a Review</button>
    //         </form>
    //     </div>
    // )


    const dispatch = useDispatch();
    const [review, setReview] = useState("");
    const [cups, setCups] = useState(null);
    const [reviewButton, setReviewButton] = useState();
    const [hoveredCups, setHoveredCups] = useState(null);
    const numbers = [1, 2, 3, 4, 5]
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
      e.preventDefault();

      const newReview = {
        review,
        cups
      };

      dispatch(thunkCreateProductReview(newReview, product_id))
      closeModal();
    };

    const handleMouseOver = (num) => {
      setHoveredCups(num);
    };

    const handleMouseLeave = () => {
      setHoveredCups(null);
    };

    const changeClassName = (value) => {
      if (hoveredCups !== null) {
        return value <= hoveredCups
          ? "fas fa-star star-hover"
          : "far fa-star";
      }
      if (value <= cups) {
        return "fas fa-star";
      }
      return "far fa-star";
    };

    const disabledButton = () => {
      if (!cups) return true;
      return false;
    };

    useEffect(() => {
      if (!cups) {
        setReviewButton("review-button-disabled");
      } else setReviewButton("review-button-enabled");
    }, [cups, review]);


    return (
      <div className="new-review-container">
        <h2 className="title-header">Review</h2>
        <form onSubmit={handleSubmit} className="review-form">
          <textarea
            className="review-text-box"
            type="text"
            rows="10"
            value={review}
            placeholder="Leave your review here"
            onChange={(e) => setReview(e.target.value)}
          />
          <br />
          <div
            className="review-cups"
            onMouseLeave={handleMouseLeave}
          >
            {numbers.map((value) => (
              <div key={value}>
                <i
                  className={changeClassName(value)}
                  onMouseOver={() => handleMouseOver(value)}
                  onClick={() => setCups(value)}
                ></i>
              </div>
            ))}
            <div className="cups">Cups</div>
          </div>
          <div className="submit-container">
            <button
              id={reviewButton}
              type="submit"
              disabled={disabledButton()}
            >
              Submit Your Review
            </button>
          </div>
        </form>
      </div>
    );
  };

export default CreateNewReview
