import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../currentUser/currentUserSlice";

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
