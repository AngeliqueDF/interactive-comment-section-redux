import CommentBase from "./CommentBase/CommentBase";

const Replies = ({ replies }) => {
	return (
		<div className="comment-replies">
			{replies.map((reply) => (
				<CommentBase key={reply.id} comment={reply} />
			))}
		</div>
	);
};

const TopLevelComment = ({ comment }) => {
	return (
		<>
			<CommentBase comment={comment} />

			{comment.replies.length > 0 ? (
				<Replies replies={comment.replies} />
			) : null}
		</>
	);
};

export default TopLevelComment;
