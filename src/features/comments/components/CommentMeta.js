import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../currentUser/currentUserSlice";
import { selectUserById } from "../../users/usersSlice";
import { formatDate } from "../../../utils/helper";

const CommentMeta = ({ authorID, createdAt }) => {
	const currentUser = useSelector(selectCurrentUser);
	const author = useSelector((state) => selectUserById(state, authorID));

	return (
		<>
			<img
				className="comment-author-image"
				src={author.image.png}
				alt={`${author.username}`}
			/>
			<p className="comment-author">
				{author.username}{" "}
				{author.id === currentUser.id ? (
					<span className="own-comment-indicator">you</span>
				) : null}
			</p>
			{/* TODO remove fallback value */}
			<p className="comment-date">{formatDate(createdAt) || createdAt}</p>
		</>
	);
};

export default CommentMeta;
