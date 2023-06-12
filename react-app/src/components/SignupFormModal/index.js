import React, { useState , useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom'
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [showMenu, setShowMenu] = useState(false);
	const { closeModal } = useModal();
	const ulRef = useRef();
	const [signUpState, setSignUpState] = useState()
	const sessionUser = useSelector((state) => state.session.user)

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
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

	  const disabledButton = () => {
		return password !== confirmPassword
		}

	  useEffect(() => {
		if (password !== confirmPassword) {
		  setSignUpState('submit-disabled')
		} else {
		  setSignUpState('submit-enabled')
		}
	  }, [password, confirmPassword])

	  if (sessionUser) return <Redirect to="/" />;

	return (
		<div className='signup-outer-container'>
			<h1 className='signup-text'>Sign Up</h1>
			<form className='signup-form-container' onSubmit={handleSubmit}>
					{errors.map((error, idx) => (
						<ul className='signup-errors' key={idx}>*{error}</ul>
					))}
				<label className='signup-email-container'>
					Email
					<input
						type="text"
						className='signup-form-input'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label className='signup-username-container'>
					Username
					<input
						type="text"
						className='signup-form-input'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label className='signup-password-container'>
					Password
					<input
						type="password"
						className='signup-form-input'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label className='signup-confirm-container'>
					Confirm Password
					<input
						type="password"
						className='signup-form-input'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button className='signup-button' id={signUpState} type="submit" disable={disabledButton()}>Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
