import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import allProductsReducer from './products';
import productReviewsReducer from './reviews';
import allUserShops from './shop';
import cartReducer from './shopping_cart';

const rootReducer = combineReducers({
  session,
  products: allProductsReducer,
  productReviews: productReviewsReducer,
  userShops: allUserShops,
  userCart: cartReducer
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
