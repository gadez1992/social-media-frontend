import React from "react";
// import { Button, CardPanel } from "react-materialize";
// import PostItem from "./PostItem";
import "./UserInfo.css";

const UserInfo = (props) => {
	return (
		<div className="container1">
			<div className="row card-panel profile-strip">
				<div className="col s12">
					<div className="col s1">
						<img
							className=" circle user-info-image"
							alt={props.name}
							src={`http://localhost:5000/${props.image}`}
						/>
					</div>
					<h6 className="col s10">{props.name.toUpperCase()}</h6>
				</div>
			</div>
		</div>
	);
};

export default UserInfo;
