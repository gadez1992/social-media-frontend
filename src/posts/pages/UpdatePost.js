import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, CardPanel } from "react-materialize";
import axios from "axios";

import { AuthContext } from "../../context/auth-context";
import "./PostForm.css";

const UpdatePost = () => {
	const [loadedPost, setLoadedPost] = useState();
	const postId = useParams().postId;
	const history = useHistory();
	const auth = useContext(AuthContext);
	const [error, setError] = useState(false);

	//GET POSTS BY ID
	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_BACKEND_URL}/posts/${postId}`
				);
				console.log(response);
				setLoadedPost(response.data.post);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchPost();
	}, [postId]);

	if (!loadedPost) {
		return (
			<div className="center">
				<CardPanel>
					<h2>Could not find post!</h2>
				</CardPanel>
			</div>
		);
	}

	async function updatePlaceSubmitHandler(values, { setSubmitting, resetForm }) {
		try {
			const headers = {
				"Content-Type": "application/json",
				Authorization: "Bearer " + auth.token,
			};
			const response = await axios.patch(
				`${process.env.REACT_APP_BACKEND_URL}/posts/${postId}`,
				{
					title: values.title,
					description: values.description,
				},
				{ headers }
			);
			console.log("updated");
			console.log(response);
			setSubmitting(false);
			history.push("/" + auth.userId + "/posts");
		} catch (error) {
			setError(error.response.data.message);
			setSubmitting(false);
		}
	}

	const validationSchema = Yup.object().shape({
		title: Yup.string().required("Username is required"),
		description: Yup.string()
			.required("Post description is required")
			.min(5, "Description should be at least 5 characters"),
	});

	return (
		<React.Fragment>
			<div className="margin-top2"></div>
			<h2 className="center">Edit Post</h2>

			<Formik
				initialValues={{
					title: loadedPost.title,
					description: loadedPost.description,
					isSubmitting: true,
				}}
				//called validation
				validationSchema={validationSchema}
				onSubmit={updatePlaceSubmitHandler}
			>
				{/* Attirbutes from Formick API */}
				{({
					values,
					errors,
					touched,
					dirty,
					isSubmitting,
					handleChange,
					handleBlur,
					handleReset,
					handleSubmit,
				}) => (
					<Form className="post-form">
						{/* title */}
						<div className="">
							<label htmlFor="title">Title</label>
							<Field
								type="text"
								name="title"
								className={`${touched.title && errors.title ? "is-invalid" : ""}`}
							/>
							<ErrorMessage component="div" name="title" className="red-text" />
						</div>
						{/* description */}
						<div className="">
							<label htmlFor="description">Post</label>
							<Field
								// component="textarea"
								type="text"
								name="description"
								className={`${
									touched.description && errors.description ? "is-invalid" : ""
								}`}
							/>
							<ErrorMessage component="div" name="description" className="red-text" />
						</div>

						<div className="red-text">{error}</div>
						<Button
							className="post-form-buttons"
							type="submit"
							node="button"
							disabled={isSubmitting}
						>
							Submit
						</Button>
					</Form>
				)}
			</Formik>
		</React.Fragment>
	);
};

export default UpdatePost;

// setEditPost({
// 	...editPost,
// 	title: response.data.post.title,
// 	description: response.data.post.description,
// });
// const [editPost, setEditPost] = useState({
// 	title: "",
// 	description: "",
// });

// setEditPost((prevPost) => {
// 	return {
// 		...prevPost,
// 		title: response.data.post.title,
// 		description: response.data.post.description,
// 	};
// });

// useEffect(() => {
// 	if (identifiedPost) {
// 		setEditPost((prevPost) => {
// 			return {
// 				...prevPost,
// 				title: identifiedPost.title,
// 				description: identifiedPost.description,
// 			};
// 		});
// 	}
// 	setIsLoading(false);
// }, [setEditPost, identifiedPost]);

// const [isLoading, setIsLoading] = useState(true);
// if (isLoading) {
// 	return (
// 		<div className="center">
// 			<h2>Loading...</h2>
// 		</div>
// 	);
// }
// const DUMMY_POSTS = [
// 	{
// 		id: "p1",
// 		title: "Hats",
// 		description: "This is a post about hats!",
// 		imageUrl:
// 			"https://cdn.shopify.com/s/files/1/0783/1855/products/Free-shipping-Hat-women-s-autumn-and-winter-fashion-dome-cap-fedoras-female-bucket-hats-women.jpg?v=1570198945",
// 		creator: "u1",
// 	},
// 	{
// 		id: "p2",
// 		title: "Ties",
// 		description: "This is a post about ties in NY",
// 		imageUrl:
// 			"https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
// 		creator: "u1",
// 	},
// ];

// const UpdatePost = () => {
// 	const [isLoading, setIsLoading] = useState(true);
// 	const postId = useParams().postId;
// 	const [editPost, setEditPost, updateEditPost ] = useInputState({
// 		title: "",
// 		description: "",
// 	});

// 	const identifiedPost = DUMMY_POSTS.find((p) => p.id === postId);

// 	useEffect(() => {
// 		if (identifiedPost) {
// 			setEditPost(prevPost => {
// 				return{
// 					...prevPost,
// 					title: identifiedPost.title,
// 					description: identifiedPost.description,
// 				}
// 			});
// 		}
// 		setIsLoading(false);
// 	}, [setEditPost, identifiedPost]);

// 	const postUpdateSubmitHandler = (event) => {
// 		event.preventDefault();
// 		console.log(editPost);
// 	};

// 	if (!identifiedPost) {
// 		return (
// 			<div className="center">
// 				<CardPanel>
// 					<h2>Could not find post!</h2>
// 				</CardPanel>
// 			</div>
// 		);
// 	}

// 	if (isLoading) {
// 		return (
// 			<div className="center">
// 				<h2>Loading...</h2>
// 			</div>
// 		);
// 	}

// 	return (
// 		<form className="post-form" onSubmit={postUpdateSubmitHandler}>
// 			<input
// 				value={editPost.title}
// 				name="title"
// 				type="text"
// 				placeholder="Edit title"
// 				onChange={updateEditPost}
// 			/>
// 			<textarea
// 				value={editPost.description}
// 				name="description"
// 				placeholder="Edit post"
// 				cols="10"
// 				rows="3"
// 				onChange={updateEditPost}
// 			></textarea>
// 			{/* <Link to="/"> */}
// 			<Button node="button" type="submit">
// 				SUBMIT
// 			</Button>
// 			{/* </Link> */}
// 		</form>
// 	);
// };

// export default UpdatePost;

// onSubmit={(values, { setSubmitting, resetForm }) => {
// 	setTimeout(() => {
// 		console.log(values);
// 		// setEditPost({
// 		// 	title: values.title,
// 		// 	description: values.description
// 		// })
// 		setSubmitting(true);
// 		resetForm();
// 		setSubmitting(false);
// 	}, 400);
// }}
