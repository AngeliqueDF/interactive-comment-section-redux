import { useRef, useState, useEffect } from "react";
import {
	moveCaretToContentEditableEnd,
	moveCaretToTextareaEnd,
} from "../../../utils/helper";

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
	const [gettingReply, setGettingReply] = useState(false);
	const handleReplyBtnClick = () => {
		setGettingReply(!gettingReply);
	};
	const [updating, setUpdating] = useState(false);
	const handleEditBtnClick = () => {
		setUpdating(!updating);
	};
	const contentArea = useRef(null);
	useEffect(() => {
		if (contentArea.current) {
			// focus on the content area that is now editable
			contentArea.current.focus();

			// then move the caret at the end for better UX
			moveCaretToContentEditableEnd(".comment-content.updating");
		}
	});

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
					toggleGettingReply={handleReplyBtnClick}
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

			<NewComment currentUser={currentUser} replyingTo={user.username} />
		</>
	);
};

export default CommentBase;
