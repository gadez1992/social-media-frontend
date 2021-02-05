import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import PostList from "../components/PostList";
import UserInfo from "../components/UserInfo";
import { CardPanel, Button } from "react-materialize";
// import { AuthContext } from "../../context/auth-context";
import Loading from "../../UI/Loading";
import "./UserPosts.css";

const UserPosts = () => {
	const [loadedPosts, setLoadedPosts] = useState();
	const [loading, setLoading] = useState(true);

	// const auth = useContext(AuthContext);
	// const userId = auth.userId;
	const userId = useParams().userId;

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					`${process.env.REACT_APP_BACKEND_URL}/posts/user/${userId}`
				);
				console.log("posts fecthed");
				console.log(response.data);
				setLoading(false);
				setLoadedPosts(response.data.posts);
			} catch (error) {
				setLoading(false);
				console.log(error.response.data);
			}
		};
		fetchPosts();
	}, [userId]);

	const handleDeletePost = (deletedPlaceId) => {
		setLoadedPosts((prevPost) =>
			prevPost.filter((post) => post.id !== deletedPlaceId)
		);
	};

	const [user, setUser] = useState();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`
				);
				console.log("USER FETCHED");
				console.log(response.data.user);
				setUser(response.data.user);
			} catch (error) {
				console.log(error.response.data);
			}
		};
		fetchUser();
	}, [userId]);

	const noPostFound = (
		<div className="center black white-text">
			<CardPanel>
				<h3>No posts found</h3>
				<Link to="/posts/new">
					<Button className="btn-1" node="button">
						Create your own post
					</Button>
				</Link>
			</CardPanel>
		</div>
	);

	return (
		<React.Fragment>
			<div className="margin-top3"></div>
			{user && <UserInfo name={user.name} image={user.image} />}
			{loading && <Loading />}
			{loadedPosts ? (
				<PostList items={loadedPosts} onDelete={handleDeletePost} />
			) : (
				noPostFound
			)}
		</React.Fragment>
	);
};

export default UserPosts;

//{loadedPosts && <PostList items={loadedPosts} onDelete={handleDeletePost} />}

// if (props.items.length === 0) {
// 	return (
// 		<div className="post-list center">
// 			<CardPanel>
// 				<h2>No post found. Share your trends</h2>
// 				<Link to="/posts/new">
// 					<Button node="button">Share Post</Button>
// 				</Link>
// 			</CardPanel>
// 		</div>
// 	);
// }
