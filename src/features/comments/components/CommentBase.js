import ScoreButtons from "../../scoreButtons/components/ScoreButtons";
import CommentMeta from "./CommentMeta";
import CommentControl from "./CommentControl";
import CommentContent from "./CommentContent";
import NewReply from "./NewReply";

/**
 * Presentational component for comments (top level, and replies)
 */
const CommentBase = ({
	comment: { id, content, createdAt, score, replyingTo, user, gettingReply },
	currentUser,
	incrementScore,
	decrementScore,
}) => {
	gettingReply = true;
	return (
		<>
			<article className="comment updating">
				<ScoreButtons
					id={id}
					replyingTo={replyingTo}
					score={score}
					incrementScore={incrementScore}
					decrementScore={decrementScore}
				/>

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

				<button id="update">update</button>
			</article>

			{gettingReply ? (
				<NewReply currentUser={currentUser} replyingTo={user.username} />
			) : null}
		</>
	);
};

export default CommentBase;
