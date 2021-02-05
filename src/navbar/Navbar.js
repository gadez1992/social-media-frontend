import React, { useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";

import { AuthContext } from "../context/auth-context";
import "./Navbar.css";

const Navbar = () => {
	const auth = useContext(AuthContext);

	useEffect(() => {
		var elems = document.querySelectorAll(".sidenav");
		// var instances =
		M.Sidenav.init(elems, {}); //object for options
	}, []);

	return (
		<React.Fragment>
			<nav className=" navbar boder-bottom">
				<div className="container1">
					<div className="main-nav">
						<Link to="/" data-target="mobile-demo" className="sidenav-trigger">
							<i className="material-icons side-nav-buttom">menu</i>
						</Link>
						<div className="nav-logo hide-on-small-only">
							<Link to="/posts" className="logo">
								STYLE<span>M</span>
							</Link>
						</div>

						<div className="nav-logo hide-on-med-and-up">
							<Link to="/posts" className="logo">
								STYLE<span>M</span>
							</Link>
						</div>

						<ul id="nav-mobile" className="right hide-on-small-only">
							<li>
								<NavLink to="/posts">HOME</NavLink>
							</li>
							<li>
								<NavLink to="/">USERS</NavLink>
							</li>
							{auth.isLoggedIn && (
								<li className="third-tab">
									<Link to={`/${auth.userId}/posts`}>PROFILE</Link>
								</li>
							)}
							{auth.isLoggedIn && (
								<li>
									<NavLink to="/posts/new">ADD POST</NavLink>
								</li>
							)}
							{!auth.isLoggedIn && (
								<li className="login-tab">
									<NavLink to="/auth">
										LOG IN<span id="login">/</span>SIGN UP
									</NavLink>
								</li>
							)}
							<li>
								{auth.isLoggedIn && (
									<NavLink to="/" onClick={auth.logout}>
										LOG OUT
									</NavLink>
								)}
							</li>
						</ul>
					</div>
				</div>
			</nav>
			{/* side nav */}
			<ul className="sidenav black" id="mobile-demo">
				<li>
					<NavLink to="/posts">HOME</NavLink>
				</li>
				<li>
					<NavLink to="/">USERS</NavLink>
				</li>
				{auth.isLoggedIn && (
					<li className="third-tab">
						<Link to={`/${auth.userId}/posts`}>PROFILE</Link>
					</li>
				)}
				{auth.isLoggedIn && (
					<li>
						<NavLink to="/posts/new">ADD POST</NavLink>
					</li>
				)}
				{!auth.isLoggedIn && (
					<li className="login-tab">
						<NavLink to="/auth">
							LOG IN<span id="login">/</span>SIGN UP
						</NavLink>
					</li>
				)}
				<li>
					{auth.isLoggedIn && (
						<NavLink to="/" onClick={auth.logout}>
							LOG OUT
						</NavLink>
					)}
				</li>
			</ul>
		</React.Fragment>
	);
};

export default Navbar;
