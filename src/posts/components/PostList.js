import React from "react";
import PostItem from "./PostItem";
import "./PostList.css";

const PostList = (props) => {
	return (
		<ul className="post-list">
			{props.items.map((post) => (
				<PostItem
					key={post.id}
					id={post.id}
					name={post.name}
					userImage={post.userImage}
					image={post.image}
					title={post.title}
					description={post.description}
					creatorId={post.creator}
					onDelete={props.onDelete}
				/>
			))}
		</ul>
	);
};

export default PostList;
