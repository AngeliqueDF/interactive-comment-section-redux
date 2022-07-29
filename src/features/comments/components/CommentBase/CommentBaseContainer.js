import { useRef, useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { updateComment } from "../../commentsSlice";
import { selectUsernames } from "../../../users/usersSlice";

import {
	moveCaretToContentEditableEnd,
	moveCaretToTextareaEnd,
} from "../../../../utils/helper";

import CommentBase from "./CommentBase";

const CommentBaseContainer = ({ comment, comment: { id, user } }) => {
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
		<CommentBase
			comment={comment}
			authorUsername={authorUsername}
			updating={updating}
			contentArea={contentArea}
			deleting={deleting}
			toggleDeleteModal={toggleDeleteModal}
			handleReplyBtnClick={handleReplyBtnClick}
			toggleUpdating={toggleUpdating}
			setReplyingToComment={setReplyingToComment}
			handleUpdateClick={handleUpdateClick}
			gettingReply={gettingReply}
			replyingRef={replyingRef}
			replyingToComment={replyingToComment}
		/>
	);
};

export default CommentBaseContainer;
