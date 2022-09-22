import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "./../../currentUser/currentUserSlice";

import { addComment, selectComments } from "../commentsSlice";

import Button from "./Button";

const NewComment = () => {
	const comments = useSelector(selectComments);
	const currentUser = useSelector(selectCurrentUser);
	const dispatch = useDispatch();

	// If the user's information wasn't received yet, exit
	if (!currentUser) return;

	const attributes = {
		dataRequestType: "ADD_COMMENT",
		formClass: "new-comment",
		placeholder: comments.length
			? "Add a comment…"
			: "There are no comment yet, add the first one!",
		btnContent: "send",
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const payload = {
			content: e.target.newContent.value,
			user: currentUser.id,
		};
		dispatch(addComment(payload));
		e.target.newContent.value = "";
	};

	return (
		<form className={attributes.formClass} onSubmit={handleSubmit}>
			<img src={currentUser.image.png} alt={currentUser.username} />
			<textarea
				defaultValue={attributes.defaultValue}
				placeholder={attributes.placeholder}
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

export default NewComment;
