import React from "react";
import "./App.css";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";
import Navbar from "./navbar/Navbar";
import User from "./user/pages/User";
import Auth from "./user/pages/Auth";
import AllPosts from "./posts/pages/AllPosts";
import UserPosts from "./posts/pages/UserPosts";
import NewPost from "./posts/pages/NewPost";
import UpdatePost from "./posts/pages/UpdatePost";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";

function App() {
	const { token, login, logout, userId, userName, userImage } = useAuth();

	// const [userName, setUserName] = useState(false);

	// const saveUserName = useCallback(uname => {
	// 	setUserName(uname)
	// }, []);

	// const [token, setToken] = useState(false);
	// const [userId, setUserId] = useState(false);

	// const login = useCallback((uid, token) => {
	//   setToken(token);
	//   setUserId(uid);
	// }, []);

	// const logout = useCallback(() => {
	//   setToken(null);
	// 	setUserId(null);
	// 	console.log("log out");
	// }, []);

	let routes;

	if (!token) {
		routes = (
			<Switch>
				<Route path="/posts" exact>
					<AllPosts />
				</Route>
				<Route path="/" exact>
					<User />
				</Route>
				<Route path="/:userId/posts" exact>
					<UserPosts />
				</Route>
				<Route path="/auth">
					<Auth />
				</Route>
				<Redirect to="/auth" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/posts" exact>
					<AllPosts />
				</Route>
				<Route path="/" exact>
					<User />
				</Route>
				<Route path="/:userId/posts" exact>
					<UserPosts />
				</Route>
				<Route path="/posts/new" exact>
					<NewPost />
				</Route>
				<Route path="/posts/:postId">
					<UpdatePost />
				</Route>
				<Redirect to="/posts" />
			</Switch>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				userName: userName,
				userImage: userImage,
				token: token,
				userId: userId,
				login: login,
				logout: logout,
			}}
		>
			<Router>
				<Navbar />
				<main>{routes}</main>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
