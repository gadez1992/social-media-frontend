import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "react-materialize";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./PostForm.css";

const NewPost = () => {
	const auth = useContext(AuthContext);
	const history = useHistory();
	const [error, setError] = useState(false);

	async function placeSubmitHandler(values, { setSubmitting }) {
		setSubmitting(true);
		try {
			const headers = {
				"Content-Type": "multipart/form-data",
				Authorization: "Bearer " + auth.token,
			};
			const formData = new FormData();
			formData.append("title", values.title);
			formData.append("description", values.description);
			formData.append("image", values.image);
			formData.append("name", auth.userName);
			formData.append("userImage", auth.userImage);

			const response = await axios.post(
				`${process.env.REACT_APP_BACKEND_URL}/posts`,
				formData,
				{ headers }
			);
			console.log(response);
			setSubmitting(false);
			history.push("/posts");
		} catch (error) {
			setError(error.response.data.message);
			setSubmitting(false);
		}
	}

	const validationSchema = Yup.object().shape({
		image: Yup.mixed().required("An image is required"),
		title: Yup.string().required("Post title is required"),
		description: Yup.string()
			.required("Post description is required")
			.min(5, "Description should be at least 5 characters"),
	});

	return (
		<React.Fragment>
			<div className="margin-top2"></div>
			<h2 className="center">Create Post</h2>
			<Formik
				initialValues={{
					title: "",
					description: "",
					image: "",
					isSubmitting: true,
				}}
				validationSchema={validationSchema}
				onSubmit={placeSubmitHandler}
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
					setFieldValue,
				}) => (
					<Form className="post-form">
						{/* title */}
						<div className="">
							<label htmlFor="title">Title</label>
							<Field type="text" name="title" />
							<ErrorMessage component="div" name="title" className="red-text" />
						</div>
						{/* description */}
						<div className="">
							<label htmlFor="description">Post</label>
							<Field
								// component="textarea"
								type="text"
								name="description"
							/>
							<ErrorMessage component="div" name="description" className="red-text" />
						</div>
						{/* file upload */}
						<div className="post-form-image-upload">
							<label htmlFor="image">Upload Image: </label>
							<input
								name="image"
								type="file"
								accept=".jpg,.png,.jpeg"
								onChange={(event) =>
									setFieldValue("image", event.currentTarget.files[0])
								}
							/>
						</div>
						<br></br>
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

export default NewPost;
