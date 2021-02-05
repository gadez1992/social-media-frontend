import React from "react";
import { CardPanel } from "react-materialize";

import "./Loading.css";

const Loading = (props) => {
	return (
		<CardPanel className=" loading-card center white-text black">
			<h3>Loading...</h3>
		</CardPanel>
	);
};

export default Loading;
