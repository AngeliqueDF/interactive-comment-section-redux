import DeleteCommentModal from "./DeleteCommentModal";

const CommentControl = ({
	authorID,
	commentID,
	deleting,
	toggleDeleteModal,
	toggleGettingReply,
	toggleUpdating,
}) => {
	if (deleting) {
		document.querySelector("main").classList.add("modal-open");
		return (
			<DeleteCommentModal
				commentID={commentID}
				toggleDeleteModal={toggleDeleteModal}
			/>
		);
	}
	if (currentUsername === author) {
		const handleEditBtnClick = () => {
			toggleUpdating();
		};
		const handleDeleteBtnClick = () => {
			toggleDeleteModal(commentID);
			console.log(commentID);
		};
		return (
			<div className="comment-control">
				{/* TODO onclick, open modal */}
				<button onClick={handleDeleteBtnClick} className="delete-button">
					Delete
				</button>
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
