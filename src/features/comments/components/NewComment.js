import Button from "./Button";

const NewComment = ({ currentUser, replyingTo, replyingRef }) => {
	// If the user's information wasn't received yet, exit
	if (!currentUser) return;

	// Attributes will have different values depending on whether the button is used to add a reply or a new comment
	const attributes = {
		dataRequestType: "ADD_COMMENT",
		formClass: replyingTo ? "new-comment reply" : "new-comment",
		defaultValue: replyingTo ? `@${replyingTo} ` : "",
		placeholder: replyingTo ? "" : "Add a comment…",
		btnContent: replyingTo ? "reply" : "send",
	};

	const handleClick = (e) => {
		e.preventDefault();
		console.log(e.target.dataset);
	};

	return (
		<form className={attributes.formClass}>
			<img src={currentUser.image.png} alt={currentUser.username} />
			<textarea
				defaultValue={attributes.defaultValue}
				placeholder={attributes.placeholder}
				ref={replyingTo ? replyingRef : null}
			></textarea>

			<Button
				dataRequestType={attributes.dataRequestType}
				onClick={handleClick}
				content={attributes.btnContent}
			/>
		</form>
	);
};

export default NewComment;
