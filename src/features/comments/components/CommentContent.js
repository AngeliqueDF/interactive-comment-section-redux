import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../currentUser/currentUserSlice";
const CommentContent = ({
	authorID,
	replyingToUser,
	content,
	contentArea,
	updating,
}) => {
	const currentUser = useSelector(selectCurrentUser);
	// Determines whether the current user wrote the commnent being rendered
	const byCurrentUser = currentUser.id === authorID;

	return (
		<div
			// Add the .updating class to apply a border to the text area, visible when it loses focus
			className={`comment-content ${
				byCurrentUser && updating ? "updating" : ""
			}`}
			// Check the user is the author of the comment and has clicked on edit button before making the div editable
			contentEditable={byCurrentUser && updating ? true : false}
			// remove React error
			suppressContentEditableWarning={byCurrentUser ? true : null}
		>
			{!(replyingToUser == null) ? (
				<>
					<span className="replying-to">@{replyingToUser}</span>{" "}
				</>
			) : null}
			<span
				ref={byCurrentUser && updating ? contentArea : null}
				className="content"
			>
				{content}
			</span>
		</div>
	);
};

export default CommentContent;
