const CommentMeta = ({ authorID, createdAt }) => {
	return (
		<>
			<img
				className="comment-author-image"
				src={user.image.png}
				alt={`${user.username}`}
			/>
			<p className="comment-author">
				{user.username}{" "}
				{user.username === currentUsername ? (
					<span className="own-comment-indicator">you</span>
				) : null}
			</p>
			<p className="comment-date">{createdAt}</p>
		</>
	);
};

export default CommentMeta;
