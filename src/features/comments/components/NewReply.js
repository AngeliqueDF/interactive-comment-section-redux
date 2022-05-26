const NewReply = ({ currentUser, replyingTo }) => {
	return (
		<form className="new-reply">
			<img src={currentUser.image.png} alt={currentUser.username} />
			<textarea defaultValue={`@${replyingTo} `}></textarea>
			<button
				onClick={(e) => {
					e.preventDefault();
					console.log("reply button clicked, display the new reply component");
				}}
			>
				Reply
			</button>
		</form>
	);
};

export default NewReply;
