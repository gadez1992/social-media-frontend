import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardTitle, Icon, Modal } from "react-materialize";
import axios from "axios";

import { AuthContext } from "../../context/auth-context";
import "./PostItem.css";

const PostItem = (props) => {
	const auth = useContext(AuthContext);
	// const history = useHistory();

	const confirmDeleteHandler = async () => {
		try {
			const headers = {
				Authorization: "Bearer " + auth.token,
			};
			await axios.delete(
				`${process.env.REACT_APP_BACKEND_URL}/posts/${props.id}`,
				{
					headers,
				}
			);
			props.onDelete(props.id);
		} catch (error) {
			console.log(error.message);
		}
	};
	return (
		<React.Fragment>
			<li className="post-item">
				<Card
					className="post-item-card"
					closeIcon={<Icon className="black">close</Icon>}
					header={
						<CardTitle
							className="post-item-image"
							image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
						></CardTitle>
					}
					title=" "
					reveal={
						<div className="post-item-reveal">
							<h3>{props.title.toUpperCase()}</h3>
							<p class="reveal-description">{props.description}</p>
						</div>
					}
					revealIcon={<Icon className="reveal-icon">more_vert</Icon>}
				>
					<div className="post-item-info">
						<Link to={`/${props.creatorId}/posts`} className="profile-card">
							<div className="col s1">
								<img
									className=" circle profile-card-image"
									alt={props.name}
									src={`${process.env.REACT_APP_ASSET_URL}/${props.userImage}`}
								/>
							</div>
							<h6 className="profile-card-name white-text col s10">
								{props.name.toUpperCase()}
							</h6>
						</Link>

						<h5 className="post-item-info-title">{props.title.toUpperCase()}</h5>
						<p className="post-item-info-description">{props.description}</p>
					</div>

					<div className="post-item-options">
						{/* <Button node="button">LIKE</Button> */}
						{auth.userId === props.creatorId && (
							<Link to={`/posts/${props.id}`}>
								<Button node="button">EDIT</Button>
							</Link>
						)}
						{auth.userId === props.creatorId && (
							<Modal
								// actions={[
								// 	<Button flat modal="close" node="button" waves="green">
								// 		Cancel
								// 	</Button>,
								// ]}
								className="post-item-modal-content"
								bottomSheet={false}
								fixedFooter={false}
								header=""
								id="Modal-0"
								open={false}
								options={{
									dismissible: true,
									endingTop: "10%",
									// inDuration: 250,
									onCloseEnd: null,
									onCloseStart: null,
									onOpenEnd: null,
									onOpenStart: null,
									opacity: 0.5,
									// outDuration: 250,
									preventScrolling: true,
									startingTop: "4%",
								}}
								// root={[object HTMLBodyElement]}
								trigger={auth.isLoggedIn && <Button node="button">DELETE</Button>}
							>
								<p>Are you sure you want to delete this post?</p>
								<Button
									className="post-item-modal-buttons post-item-modal-delete-button"
									modal="close"
									node="button"
									onClick={confirmDeleteHandler}
								>
									Yes, delete it
								</Button>
								<Button className="post-item-modal-buttons" modal="close" node="button">
									Cancel
								</Button>
							</Modal>
						)}
					</div>
				</Card>
			</li>
		</React.Fragment>
	);
};

export default PostItem;

//<div className="post-item-name">{props.name}</div>
