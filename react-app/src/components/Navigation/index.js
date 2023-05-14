import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SearchBar from '../SearchBar';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignInOpenModalButton from '../SignInOpenModalButton';
import { getCartThunk } from '../../store/shopping_cart';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const ulRef = useRef();
  const dispatch = useDispatch();
  const [cartItemCount, setCartItemCount] = useState(0);

  const cartItems = Object.values(useSelector(state => state.userCart.userCart));

  const calculateTotalQuantity = cartItems => {
    return cartItems.reduce((total, cartItemObj) => {
      return total + cartItemObj.quantity;
    }, 0);
  };

  useEffect(() => {
    dispatch(getCartThunk());
    if (!showMenu) return;

    const closeMenu = e => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu, dispatch]);

  const SignInButton = ({ closeMenu }) => {
    return (
      <SignInOpenModalButton
        buttonText="Sign In"
        onItemClick={closeMenu}
        modalComponent={<LoginFormModal />}
        className="sign-in-button"
      />
    );
  };

  const shopButton = () => {
	if (sessionUser){
		return (
			<NavLink to="/shops/current" className="store-button" data-tooltip="Shop Manager">
				<i className="fa-solid fa-shop" id="shop-icon" ></i>
			</NavLink>
		)
	}
  }

  useEffect(() => {
    const totalQuantity = calculateTotalQuantity(cartItems);
    updateCartItemCount(totalQuantity);
  }, [cartItems]);

  const updateCartItemCount = count => {
    setCartItemCount(count);
  };
  return (
    <div className="navbar-container">
      <div className="logo">
        <NavLink exact to="/">
          <img src="/images/blue-lagoon.png" alt="blue-lagoon" className="blue-lagoon-logo" />
        </NavLink>
        <NavLink exact to="/" className="home-link">
          Thirsty
        </NavLink>
      </div>
      <SearchBar />
      <div className="navbar-icons">
        {shopButton()}
        {isLoaded && (
          <div>
            {sessionUser ? (
              <ProfileButton user={sessionUser} />
            ) : (
              <SignInButton closeMenu={() => setShowMenu(false)} className="sign-in-button" />
            )}
          </div>
        )}
        <NavLink to="/cart" className="shopping-cart-button">
          <i className="fa-solid fa-cart-shopping"></i>
          {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
        </NavLink>
      </div>
    </div>
  );
}

export default Navigation;
