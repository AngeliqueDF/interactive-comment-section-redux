import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../currentUser/currentUserSlice";

// Import icons
import deleteIcon from "./../../../images/icon-delete.svg";
import editIcon from "./../../../images/icon-edit.svg";
import replyIcon from "./../../../images/icon-reply.svg";

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
