import CommentBaseContainer from "./CommentBase/CommentBaseContainer";

const Replies = ({ replies }) => {
	return (
		<div className="comment-replies">
			{replies.map((reply) => (
				<CommentBaseContainer key={reply.id} comment={reply} />
			))}
		</div>
	);
};

const TopLevelComment = ({ comment }) => {
	return (
		<>
			<CommentBaseContainer comment={comment} />

			{comment.replies.length > 0 ? (
				<Replies replies={comment.replies} />
			) : null}
		</>
	);
};

export default TopLevelComment;
