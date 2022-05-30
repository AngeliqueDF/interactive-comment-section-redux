import Button from "./Button";
import ScoreButtons from "../../scoreButtons/components/ScoreButtons";
import CommentMeta from "./CommentMeta";
import CommentControl from "./CommentControl";
import CommentContent from "./CommentContent";
import NewComment from "./NewComment";

/**
 * Presentational component for comments (top level, and replies)
 */
const CommentBase = ({
	comment: { id, content, createdAt, score, replyingTo, user },
	currentUser,
}) => {
	return (
		<>
			<article className="comment updating">
				<ScoreButtons id={id} replyingTo={replyingTo} score={score} />

				{/* change class ? */}
				<div className="comment-meta">
					<CommentMeta
						user={user}
						createdAt={createdAt}
						currentUsername={currentUser.username}
					/>
				</div>

				<CommentContent
					user={user}
					content={content}
					replyingTo={replyingTo}
					currentUsername={currentUser.username}
				/>

				<CommentControl
					currentUsername={currentUser.username}
					author={user.username}
				/>

				{updating ? (
					<Button
						idAttribute="update"
						replyingTo={replyingTo}
						content="update"
						updating={updating}
						onClick={(e) => console.log(e.target.dataset)}
						dataRequestType="UPDATE_CONTENT"
					/>
				) : (
					""
				)}
			</article>

			{gettingReply ? (
				<NewComment currentUser={currentUser} replyingTo={user.username} />
			) : null}
		</>
	);
};

export default CommentBase;
