const CommentControl = ({ currentUsername, author }) => {
	if (currentUsername === author) {
		return (
			<div className="comment-control">
				{/* TODO onclick, open modal */}
				<button className="delete-button">Delete</button>
				{/* TODO onclick, change gettingUpdated state and make content editable */}
				<button className="edit-button">Edit</button>
			</div>
		);
	} else {
		return (
			<div className="comment-control">
				<button className="reply-button">Reply</button>
			</div>
		);
	}
};

export default CommentControl;
