import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../currentUser/currentUserSlice";
const CommentMeta = ({ authorID, createdAt }) => {
	const currentUser = useSelector(selectCurrentUser);
	return (
		<>
			<img
				className="comment-author-image"
				src={author.image.png}
				alt={`${author.username}`}
			/>
			<p className="comment-author">
				{user.username === currentUsername ? (
				{author.username}{" "}
					<span className="own-comment-indicator">you</span>
				) : null}
			</p>
			<p className="comment-date">{createdAt}</p>
		</>
	);
};

export default CommentMeta;
