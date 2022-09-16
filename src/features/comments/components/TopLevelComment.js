import CommentBaseContainer from "./CommentBase/CommentBaseContainer";

const Replies = ({ replies }) => {
	const sortedReplies = replies.sort((a, b) => {
		const date1 = new Date(a.createdAt);
		const date2 = new Date(b.createdAt);

		return date2 - date1;
	});

	return (
		<div className="comment-replies">
			{sortedReplies.map((reply) => (
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
