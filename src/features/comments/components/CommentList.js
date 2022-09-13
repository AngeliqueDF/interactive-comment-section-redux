import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectComments, getAllComments } from "./../commentsSlice";

import TopLevelComment from "./TopLevelComment";

const CommentList = () => {
	const comments = useSelector(selectComments);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllComments());
	}, [dispatch]);

	return (
		<>
			{comments &&
				[...comments]
					.sort((a, b) => b.score - a.score)
					.map((comment) => {
						if (comment.replyingToUser === null) {
							return <TopLevelComment key={comment.id} comment={comment} />;
						}
						return <React.Fragment key={comment.id}></React.Fragment>;
					})}
		</>
	);
};

export default CommentList;
