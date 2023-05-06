import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SearchBar from '../SearchBar';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className="navbar-container">
			<div className="navbar-top-row">
				<div>
					<NavLink exact to="/" className="home-link">Thirsty</NavLink>
				</div>
				{isLoaded && (
					<div>
						<ProfileButton user={sessionUser} />
					</div>
				)}
			</div>
			<div className="navbar-bottom-row">
				< SearchBar />
			</div>

		</div>
	);
}

export default Navigation;
