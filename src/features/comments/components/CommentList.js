import { useSelector } from "react-redux";
import { selectComments } from "./../commentsSlice";

import TopLevelComment from "./TopLevelComment";

const CommentList = () => {
	const comments = useSelector(selectComments);
	return (
		<>
			{comments &&
				comments.map((comment) => (
					<TopLevelComment
						key={comment.id}
						comment={comment}
						currentUser={currentUser}
					/>
				))}
		</>
	);
};

export default CommentList;
