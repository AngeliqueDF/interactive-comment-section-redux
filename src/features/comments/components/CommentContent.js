const CommentContent = ({ user, replyingTo, currentUsername, content }) => {
	return (
		<div
			className="comment-content"
			// TODO add gettingUpdated to condition
			contentEditable={currentUsername === user.username ? true : false}
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
