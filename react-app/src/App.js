import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import GetSingleProduct from "./components/SingleProduct"
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import GetAllProducts from "./components/Products";
import SearchResults from "./components/SearchResults";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/products/:product_id">
            <GetSingleProduct />
          </Route>
          <Route path= "/search/:search_terms">
            <SearchResults />
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
