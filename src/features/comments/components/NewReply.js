import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "./../../currentUser/currentUserSlice";

import { addReply } from "../commentsSlice";
import { selectUsernames } from "../../users/usersSlice";

import Button from "./Button";

const NewReply = ({ replyingToUser, replyingRef, replyingToComment }) => {
	const currentUser = useSelector(selectCurrentUser);
	const usernames = useSelector(selectUsernames);
	const { username: replyingToAuthor } = usernames.find(
		(username) => username.id === replyingToUser
	);
	const dispatch = useDispatch();
	// If the user's information wasn't received yet, exit
	if (!currentUser) return;

	const attributes = {
		dataRequestType: "ADD_COMMENT",
		formClass: "new-comment reply",
		defaultValue: `@${replyingToAuthor} `,
		btnContent: "reply",
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const payload = {
			content: e.target.newContent.value,
			user: currentUser.id,
			replyingToUser,
			replyingToAuthor,
			replyingToComment,
		};
		dispatch(addReply(payload));
	};

	return (
		<form className={attributes.formClass} onSubmit={handleSubmit}>
			<img src={currentUser.image.png} alt={currentUser.username} />
			<textarea
				defaultValue={attributes.defaultValue}
				ref={!(replyingToUser === null) ? replyingRef : null}
				name="newContent"
				required={true}
			></textarea>

			<Button
				dataRequestType={attributes.dataRequestType}
				content={attributes.btnContent}
			/>
		</form>
	);
};

export default NewReply;
