import TopLevelComment from "./TopLevelComment";

const CommentList = ({ comments }) => {
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
