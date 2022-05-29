import CommentBase from "./CommentBase";

const Replies = ({ replies, currentUser }) => {
	return (
		<div className="comment-replies">
			{replies.map((reply) => (
				<CommentBase key={reply.id} comment={reply} currentUser={currentUser} />
			))}
		</div>
	);
};

const TopLevelComment = ({
	comment,
	currentUser,
	// incrementScore,
	// decrementScore,
}) => {
	return (
		<>
			<CommentBase comment={comment} currentUser={currentUser} />

			{comment.replies.length > 0 ? (
				<Replies replies={comment.replies} currentUser={currentUser} />
			) : null}
		</>
	);
};

export default TopLevelComment;
