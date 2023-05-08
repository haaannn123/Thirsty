import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SearchBar from '../SearchBar';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';

import './Navigation.css';

function Navigation({ isLoaded }) {
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const ulRef = useRef();

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

  const SignInButton = ({ closeMenu }) => {
    return (
		<OpenModalButton
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
			<NavLink to="/">
				<i className="fa-solid fa-shop"></i>
			</NavLink>
		)
	}
  }

  return (
    <div className="navbar-container">
      <div>
        <NavLink exact to="/" className="home-link">Thirsty</NavLink>
      </div>
      <SearchBar />
	  <div className="navbar-icons">
		{shopButton()}
		{isLoaded && (
			<div>
			{sessionUser ? (
				<ProfileButton user={sessionUser} />
			) : (
				<SignInButton closeMenu={() => setShowMenu(false)} className="sign-in-button"/>
			)}
			</div>
		)}
		<NavLink to="/">
			<i className="fa-solid fa-cart-shopping"></i>
		</NavLink>
	  </div>
    </div>
  );
}

export default Navigation;
