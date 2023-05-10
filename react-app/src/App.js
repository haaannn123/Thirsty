import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import GetSingleProduct from "./components/SingleProduct"
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import GetAllProducts from "./components/Products";
import EditProduct from './components/EditProduct'
import SearchResults from "./components/SearchResults";
import ShoppingCart from "./components/ShoppingCart";

import CreateNewProduct from "./components/CreateNewProduct";
import ManageShop from './components/ManageShop'
import { thunkGetAllProducts } from "./store/products";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
    dispatch(thunkGetAllProducts())
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/shops/current">
            <ManageShop />
          </Route>
          <Route path="/products/new">
            <CreateNewProduct />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/products/:productId/edit">
            <EditProduct/>
          </Route>
          <Route exact path="/products/:product_id">
            <GetSingleProduct />
          </Route>
          <Route path= "/search/:search_terms">
            <SearchResults />
          </Route>
          <Route path="/cart">
            <ShoppingCart />
          </Route>
          <Route path="/">
            <GetAllProducts />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
