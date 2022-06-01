const CommentControl = ({
	currentUsername,
	author,
	toggleGettingReply,
	toggleUpdating,
}) => {
	if (currentUsername === author) {
		const handleEditBtnClick = () => {
			toggleUpdating();
		};
		return (
			<div className="comment-control">
				{/* TODO onclick, open modal */}
				<button className="delete-button">Delete</button>
				{/* TODO onclick, change gettingUpdated state and make content editable */}
				<button onClick={handleEditBtnClick} className="edit-button">
					Edit
				</button>
			</div>
		);
	} else {
		const handleClick = (e) => {
			toggleGettingReply();
		};
		return (
			<div className="comment-control">
				<button onClick={handleClick} className="reply-button">
					Reply
				</button>
			</div>
		);
	}
};

export default CommentControl;
