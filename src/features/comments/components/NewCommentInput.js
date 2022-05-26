import { useState } from "react";

const NewCommentInput = ({ currentUser }) => {
	// const [inputValue, setInputValue] = useState(second);
	// If the user's information wasn't received yet, exit
	if (!currentUser) return;

	// TODO if replyingTo is defined, add it to value attribute
	// TODO if replyingTo is undefined, add placeholer "Add a comment…"
	return (
		<form className="new-comment">
			<img src={currentUser.image.png} alt={currentUser.username} />
			<textarea
				// onChange={() => handleChange()}
				placeholder="Add a comment…"
			></textarea>
			<input id="add-new-comment" type="submit" value="send" />
		</form>
	);
};

export default NewCommentInput;
