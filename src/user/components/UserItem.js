import React from "react";
import { Link } from "react-router-dom";
import { CardPanel, Chip, Icon } from "react-materialize";
import "./UserItem.css";

const UserItem = (props) => {
	return (
		<li className="user-item">
			<CardPanel className="user-item-card">
				{/* props.id === user id*/}
				<Link to={`/${props.id}/posts`}>
					<Chip
						close={false}
						closeIcon={<Icon className="close">close</Icon>}
						options={null}
					>
						<img
							alt={props.name}
							className="responsive-img"
							src={`http://localhost:5000/${props.image}`}
						/>
						{props.name}
					</Chip>
				</Link>
			</CardPanel>
		</li>
	);
};
export default UserItem;
