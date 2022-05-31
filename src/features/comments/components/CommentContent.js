const CommentContent = ({
	user,
	replyingTo,
	currentUsername,
	content,
	updating,
}) => {
	return (
		<div
			// Add the .updating class to apply a border to the text area, visible when it loses focus
			className={`comment-content ${
				currentUsername === user.username && updating ? "updating" : ""
			}`}
			// Check the user is the author of the comment and has clicked on edit button before making the div editable
			contentEditable={
				currentUsername === user.username && updating ? true : false
			}
			suppressContentEditableWarning={
				currentUsername === user.username ? true : null
			}
		>
			{replyingTo ? (
				<>
					<span className="replying-to">@{replyingTo}</span>{" "}
				</>
			) : null}
			{content}
		</div>
	);
};

export default CommentContent;
