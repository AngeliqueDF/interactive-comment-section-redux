import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../currentUser/currentUserSlice";

/**
 * Presentational comment to display button element.
 */
const ControlButton = ({
	onClickFunction,
	className,
	textContent,
	iconImage,
}) => (
	<button
		style={{ backgroundImage: iconImage }}
		onClick={() => onClickFunction()}
		className={className}
	>
		{textContent}
	</button>
);

const CommentControl = ({
	authorID,
	commentID,
	toggleDeleteModal,
	toggleGettingReply,
	toggleUpdating,
	setReplyingToComment,
}) => {
	const currentUser = useSelector(selectCurrentUser);
};

export default CommentControl;
