const DeleteCommentModal = ({ toggleDeleteModal, commentID }) => {
	const handleCancelBtnClick = () => {
		document.querySelector("main").classList.remove("modal-open");
		toggleDeleteModal();
	};
	return (
		<div className="modal">
			<div className="modal-title">Delete comment</div>
			<div className="modal-message">
				Are you sure you want to delete this comment? This will remove the
				comment and can't be undone.
			</div>

			<div className="modal-buttons">
				<button onClick={handleCancelBtnClick} className="modal-cancel">
					No, cancel
				</button>

				{/* TODO send DELETE request with commentID on click */}
				<button
					className="modal-confirm"
				>
					Yes, delete
				</button>
			</div>
		</div>
	);
};

export default DeleteCommentModal;
