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

	return (
		<>
			<article
				id={`${user.username}-${id}`}
				className={`comment ${updating ? "updating" : ""}`}
			>
				<ScoreButtons id={id} score={score} />

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
					currentUsername={currentUser.username}
					replyingToUser={replyingToUser}
					contentArea={contentArea}
				/>

				<CommentControl
					currentUsername={currentUser.username}
					commentID={id}
					deleting={deleting}
					author={user.username}
					toggleDeleteModal={toggleDeleteModal}
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

			{gettingReply ? (
				<NewComment
					replyingRef={replyingRef}
					currentUser={currentUser}
					replyingTo={user.username}
				/>
			) : null}
		</>
	);
};

export default CommentBase;
