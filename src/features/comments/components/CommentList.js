import TopLevelComment from "./TopLevelComment";

const CommentList = ({
	comments,
	currentUser,
	// incrementScore,
	// decrementScore,
}) => {
	return (
		<>
			{comments &&
				comments.map((comment) => (
					<TopLevelComment
						key={comment.id}
						comment={comment}
						currentUser={currentUser}
						// incrementScore={incrementScore}
						// decrementScore={decrementScore}
					/>
				))}
		</>
	);
};

export default CommentList;
