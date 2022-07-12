import React from "react";
import { useSelector } from "react-redux";
import { selectComments } from "./../commentsSlice";

import TopLevelComment from "./TopLevelComment";

const CommentList = () => {
	const comments = useSelector(selectComments);
	return (
		<>
			{comments &&
				comments.map((comment) => {
					if (comment.replyingToUser === null) {
						return <TopLevelComment key={comment.id} comment={comment} />;
					}
					return <React.Fragment key={comment.id}></React.Fragment>;
				})}
		</>
	);
};

export default CommentList;
