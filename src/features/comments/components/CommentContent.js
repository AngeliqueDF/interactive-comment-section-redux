const CommentContent = ({
	user,
	replyingTo,
	currentUsername,
	content,
	updating,
}) => {
	return (
		<div
			// TODO add gettingUpdated to condition
			contentEditable={currentUsername === user.username ? true : false}
			// Add the .updating class to apply a border to the text area, visible when it loses focus
			className={`comment-content ${
				currentUsername === user.username && updating ? "updating" : ""
			}`}
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
