import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import singleProductReducer from './single_product';
import allProductsReducer from './products';
import newProductReducer from './create_a_product';
import productReviewsReducer from './reviews';

const rootReducer = combineReducers({
  session,
  products: allProductsReducer,
  singleProduct: singleProductReducer,
  createNewProduct: newProductReducer,
  productReviews: productReviewsReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
