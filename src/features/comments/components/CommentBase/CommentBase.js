import { useRef, useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { updateComment } from "../../commentsSlice";

import {
	moveCaretToContentEditableEnd,
	moveCaretToTextareaEnd,
} from "../../../../utils/helper";

import Button from "../Button";
import ScoreButtons from "../../../scoreButtons/components/ScoreButtons";
import CommentMeta from "../CommentMeta";
import CommentControl from "../CommentControl";
import CommentContent from "../CommentContent";
import NewReply from "../NewReply";
import DeleteCommentModal from "../DeleteCommentModal";

import { selectUsernames } from "../../../users/usersSlice";

const CommentBase = ({
	comment: { id, content, createdAt, score, replyingToUser, user },
}) => {
	const dispatch = useDispatch();
	const allUsernames = useSelector(selectUsernames);
	const { username: authorUsername } = allUsernames.find(
		(userStored) => userStored.id === user
	);

	// Stores the id of the comment whose "Reply" button was clicked/tapped.
	const [replyingToComment, setReplyingToComment] = useState(null);
	// Used to conditionnaly render NewReply when the comment is receiving an answer
	const [gettingReply, setGettingReply] = useState(false);
	const handleReplyBtnClick = () => {
		setGettingReply(!gettingReply);
	};
	const replyingRef = useRef(null);
	useEffect(() => {
		if (replyingRef.current) {
			replyingRef.current.focus();
			// From the comment referenced, find its "form.reply" sibling element and select this sibling's "textarea" child element
			const textAreaSelector = `#${authorUsername}-${id} + .reply > textarea`;
			moveCaretToTextareaEnd(textAreaSelector);
		}
	});

	const [updating, setUpdating] = useState(false);
	const toggleUpdating = () => {
		setUpdating(!updating);
	};
	const handleUpdateClick = () => {
		dispatch(
			updateComment({ id, newContent: contentArea.current.textContent })
		);
		toggleUpdating();
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
		document.querySelector("main").classList.toggle("modal-open");
		setDeleting(!deleting);
	};

	return (
		<>
			<article
				id={`${authorUsername}-${id}`}
				className={`comment${updating ? " updating" : ""}`}
			>
				<ScoreButtons id={id} score={score} />

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
					toggleUpdating={toggleUpdating}
					setReplyingToComment={setReplyingToComment}
				/>

				{updating ? (
					<Button
						idAttribute="update"
						content="update"
						onClick={handleUpdateClick}
						dataRequestType="UPDATE_CONTENT"
					/>
				) : (
					""
				)}
			</article>

			{gettingReply ? (
				<NewReply
					toggleGettingReply={handleReplyBtnClick}
					replyingRef={replyingRef}
					replyingToUser={user}
					replyingToComment={replyingToComment}
				/>
			) : null}

			{deleting ? (
				<DeleteCommentModal
					commentID={id}
					toggleDeleteModal={toggleDeleteModal}
				/>
			) : null}
		</>
	);
};

export default CommentBase;
