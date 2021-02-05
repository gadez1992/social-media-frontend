import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CardPanel, Button } from "react-materialize";

import UserList from "../components/UserList";
import Loading from "../../UI/Loading"

const Users = () => {
	const [loadedUsers, setLoadedUsers] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const sendRequest = async () => {
			try {
				setLoading(true);
				const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`);
				// console.log(response);
				console.log("fethced users");
				setLoading(false);
				setLoadedUsers(response.data.users);
			} catch (error) {
				setLoading(false);
				console.log(error.response);
			}
		};
		sendRequest();
	}, []);

	const noUsersFound = (
		<div>
			<CardPanel className="black-text center">
				<h3>No users found. Sign up</h3>
				<Link to="/auth">
					<Button className="btn-1" node="button">Signup/Login</Button>
				</Link>
			</CardPanel>
		</div>
	);

	return (
		<React.Fragment>
			<div className="margin-top"></div>
			{loading && <Loading />}
			{loadedUsers ? <UserList items={loadedUsers} /> 
			: noUsersFound}
		</React.Fragment>
	);
};

export default Users;
