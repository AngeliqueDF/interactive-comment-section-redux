import { useRef, useState, useEffect } from "react";
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
	const [updating, setUpdating] = useState(false);
	const handleEditBtnClick = () => {
		setUpdating(!updating);
	};
	const contentArea = useRef(null);
	return (
		<>
			<article
				className={`comment ${updating ? "updating" : ""}`}
			>
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
					updating={updating}
					user={user}
					content={content}
					replyingTo={replyingTo}
					currentUsername={currentUser.username}
					contentArea={contentArea}
				/>

				<CommentControl
					currentUsername={currentUser.username}
					author={user.username}
					toggleUpdating={handleEditBtnClick}
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
