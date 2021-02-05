import React from "react";
import UserItem from "./UserItem";
import "./UserList.css";

const UsersList = (props) => {
	return (
		<ul className="users-list">
			{props.items.map((user) => (
				<UserItem
					key={user.id}
					id={user.id}
					image={user.image}
					name={user.name}
					postCount={user.posts.length}
				/>
			))}
		</ul>
	);
};

export default UsersList;
