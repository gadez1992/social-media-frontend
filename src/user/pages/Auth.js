import React, { useState, useContext } from "react";
import { Button, Card } from "react-materialize";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./Auth.css";

const Auth = () => {
	const auth = useContext(AuthContext);
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [error, setError] = useState(false);

	const history = useHistory();

	const switchModeHandler = async () => {
		await setIsLoginMode((prevMode) => !prevMode);
	};

	async function authSubmitHandler(values, { setSubmitting }) {
		setSubmitting(true);
		if (isLoginMode) {
			try {
				const headers = {
					"Content-Type": "application/json",
				};
				const response = await axios.post(
					`${process.env.REACT_APP_BACKEND_URL}/users/login`,
					{
						email: values.email,
						password: values.password,
					},
					headers
				);
				console.log("login");
				// console.log(response.data.userImage);
				setSubmitting(false);
				auth.login(
					response.data.userId,
					response.data.token,
					response.data.userName,
					response.data.userImage
				);

				history.push("/posts");
			} catch (error) {
				setError(error.response.data.message);
				setSubmitting(false);
			}
		} else {
			try {
				const headers = {
					"Content-Type": "multipart/form-data",
				};
				const formData = new FormData();
				formData.append("name", values.name);
				formData.append("email", values.email);
				formData.append("password", values.password);
				formData.append("image", values.image);

				const response = await axios.post(
					`${process.env.REACT_APP_BACKEND_URL}/users/signup`,
					formData,
					{ headers }
				);
				console.log("signup");
				console.log(response);
				setSubmitting(false);
				auth.login(
					response.data.userId,
					response.data.token,
					response.data.userName,
					response.data.userImage
				);
				history.push("/posts");
			} catch (error) {
				setError(error.response.data.message);
				setSubmitting(false);
			}
		}
	}

	const validationSchema = () => {
		if (!isLoginMode) {
			return Yup.object().shape({
				name: Yup.string().required("Name is required"),

				image: Yup.mixed().required("An image is required"),

				email: Yup.string()
					.email("Invalid email address")
					.required("Email is required"),

				password: Yup.string()
					.min(6, "Password should be at least 6 characters")
					.max(10, "Password should be at less than 10 characters")
					.required("Password is required"),
			});
		} else {
			return Yup.object().shape({
				email: Yup.string()
					.email("Invalid email address")
					.required("Email is required"),

				password: Yup.string()
					.min(6, "Password should be at least 6 characters")
					.max(10, "Password should be at less than 10 characters")
					.required("Password is required"),
			});
		}
	};

	return (
		<React.Fragment>
			<div className="margin-top"></div>
			<div>{error}</div>
			<Formik
				initialValues={{
					name: "",
					email: "",
					password: "",
					image: "",
					isSubmitting: true,
				}}
				validationSchema={validationSchema}
				onSubmit={authSubmitHandler}
			>
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
					<Card className="authentication">
						<Form noValidate>
							{/* name */}
							{!isLoginMode && (
								<div className="">
									<label htmlFor="name">Name</label>
									<Field
										type="text"
										name="name"
										className={`${touched.name && errors.name ? "is-invalid" : ""}`}
									/>
									<ErrorMessage component="div" name="name" className="red-text" />
								</div>
							)}
							{/* pic upload */}
							{!isLoginMode && (
								<div className="auth-form-image-upload">
									<label htmlFor="image">Add profile pic</label>
									<input
										name="image"
										type="file"
										accept=".jpg,.png,.jpeg"
										onChange={(event) =>
											setFieldValue("image", event.currentTarget.files[0])
										}
									/>
									<ErrorMessage component="div" name="image" className="red-text" />
								</div>
							)}

							{/* email */}

							<div className="">
								<label htmlFor="email">Email</label>
								<Field type="text" name="email" />
								<ErrorMessage component="div" name="email" className="red-text" />
							</div>

							{/* password */}
							<div className="">
								<label htmlFor="password">Password</label>
								<Field type="password" name="password" />
								<ErrorMessage component="div" name="password" className="red-text" />
							</div>

							<div className="red-text">{error}</div>

							{/* <div>{error}</div> */}
							<Button
								className="login-button auth-buttons"
								type="submit"
								node="button"
								disabled={isSubmitting}
								name="signup"
							>
								{isLoginMode ? "LOGIN" : "SIGNUP"}
							</Button>
						</Form>
						<Button
							className="auth-buttons"
							node="button"
							onClick={switchModeHandler}
						>
							SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
						</Button>
					</Card>
				)}
			</Formik>
		</React.Fragment>
	);
};

export default Auth;
