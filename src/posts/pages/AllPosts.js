import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CardPanel, Button } from "react-materialize";

import PostList from "../components/PostList";
import Loading from "../../UI/Loading";
// import { AuthContext } from "../../context/auth-context";

const AllPosts = () => {
	const [loadedPosts, setLoadedPosts] = useState(false);
	const [loading, setLoading] = useState(true);
	// const auth = useContext(AuthContext);
	// const userId = auth.userId;
	// const userId = useParams().userId;

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					`${process.env.REACT_APP_BACKEND_URL}/posts/`
				);
				console.log("all posts fecthed");
				console.log(response.data);
				setLoading(false);
				setLoadedPosts(response.data.posts);
			} catch (error) {
				console.log(error.response);
				setLoading(false);
			}
		};
		fetchPosts();
	}, []);

	const handleDeletePost = (deletedPlaceId) => {
		setLoadedPosts((prevPost) =>
			prevPost.filter((post) => post.id !== deletedPlaceId)
		);
	};

	const noPostFound = (
		<div>
			<CardPanel className="black-text center">
				<h3>No posts found. Share a post</h3>
				<Link to="/posts/new">
					<Button className="btn-1" node="button">
						Add Post
					</Button>
				</Link>
			</CardPanel>
		</div>
	);

	return (
		<React.Fragment>
			<div className="margin-top4"></div>

			{loading && <Loading />}
			{loadedPosts ? (
				<PostList items={loadedPosts} onDelete={handleDeletePost} />
			) : (
				noPostFound
			)}
		</React.Fragment>
	);
};

export default AllPosts;
