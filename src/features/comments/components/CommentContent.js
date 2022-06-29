import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../currentUser/currentUserSlice";
import { selectUserById } from "../../users/usersSlice";

const CommentContent = ({
	authorID,
	replyingToUser,
	content,
	contentArea,
	updating,
}) => {
	const currentUser = useSelector(selectCurrentUser);
	const replyingToAuthor = useSelector((state) =>
		selectUserById(state, replyingToUser)
	);

	// Determines whether the current user wrote the commnent being rendered
	const byCurrentUser = currentUser.id === authorID;

	return (
		<div
			// Add the .updating class to apply a border to the text area. The border makes it visible when it loses focus so that the user knows they can still enter text in that area.
			className={`comment-content ${
				byCurrentUser && updating ? "updating" : ""
			}`}
			// Check the user is the author of the comment **and** has clicked on edit button before making the div editable
			contentEditable={byCurrentUser && updating ? true : false}
			// remove React error
			suppressContentEditableWarning={byCurrentUser ? true : null}
		>
			{!(replyingToUser == null) ? (
				<>
					<span className="replying-to">@{replyingToAuthor.username}</span>{" "}
				</>
			) : null}
			<span
				// Apply focus if the user has started updating the comment
				ref={byCurrentUser && updating ? contentArea : null}
				className="content"
			>
				{content}
			</span>
		</div>
	);
};

export default CommentContent;
