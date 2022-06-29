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
	currentUser,
	comment: { id, content, createdAt, score, replyingToUser, user },
}) => {
	const [gettingReply, setGettingReply] = useState(false);
	const handleReplyBtnClick = () => {
		setGettingReply(!gettingReply);
	};
	const replyingRef = useRef(null);
	useEffect(() => {
		if (replyingRef.current) {
			replyingRef.current.focus();

			// From the comment, find the its form.reply sibling element and select this sibling's textarea child element
			const textAreaSelector = `#${user.username}-${id} + .reply > textarea`;
			moveCaretToTextareaEnd(textAreaSelector);
		}
	});

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

	const [deleting, setDeleting] = useState(false);
	const toggleDeleteModal = () => {
		setDeleting(!deleting);
	};

	// Tracks the comment whose "Reply" button was clicked/tapped.
	const [replyingToComment, setReplyingToComment] = useState(null);

	return (
		<>
			<article
				id={`${user.username}-${id}`}
				className={`comment ${updating ? "updating" : ""}`}
			>
				<ScoreButtons id={id} score={score} />

				{/* change class ? */}
				<div className="comment-meta">
					<CommentMeta authorID={user} createdAt={createdAt} />
				</div>

				<CommentContent
					updating={updating}
					authorID={user}
					content={content}
					replyingToUser={replyingToUser}
					contentArea={contentArea}
				/>

				<CommentControl
					commentID={id}
					deleting={deleting}
					toggleDeleteModal={toggleDeleteModal}
					authorID={user}
					toggleGettingReply={handleReplyBtnClick}
					toggleUpdating={handleEditBtnClick}
					setReplyingToComment={setReplyingToComment}
				/>

				{updating ? (
					<Button
						idAttribute="update"
						content="update"
						onClick={(e) => console.log(e.target.dataset)}
						dataRequestType="UPDATE_CONTENT"
					/>
				) : (
					""
				)}
			</article>

			{gettingReply ? (
				<NewComment
					replyingRef={replyingRef}
					replyingToUser={user}
				/>
			) : null}
		</>
	);
};

export default CommentBase;
