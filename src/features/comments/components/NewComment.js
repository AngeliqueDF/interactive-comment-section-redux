import Button from "./Button";

const NewComment = (props) => {
	// If the user's information wasn't received yet, exit
	if (!currentUser) return;

	const attributes = {
		dataRequestType: "ADD_COMMENT",
		formClass: "new-comment",
		placeholder: "Add a comment…",
		btnContent: "send",
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
				name="newContent"
				required={true}
			></textarea>

			<Button
				dataRequestType={attributes.dataRequestType}
				content={attributes.btnContent}
			/>
		</form>
	);
};

export default NewComment;
