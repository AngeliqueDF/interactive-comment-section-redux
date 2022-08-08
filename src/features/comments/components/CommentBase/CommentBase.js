import Button from "../Button";
import ScoreButtons from "../ScoreButtons";
import CommentMeta from "../CommentMeta";
import CommentControl from "../CommentControl";
import CommentContent from "../CommentContent";
import NewReply from "../NewReply";
import DeleteCommentModal from "../DeleteCommentModal";

/**
 * Presentational component. All comments already posted (top level comments and replies) share this base.
 */
const CommentBase = ({
	comment: { id, content, createdAt, score, replyingToUser, user, voteGiven },
	authorUsername,
	updating,
	contentArea,
	deleting,
	toggleDeleteModal,
	handleReplyBtnClick,
	toggleUpdating,
	setReplyingToComment,
	handleUpdateClick,
	gettingReply,
	replyingRef,
	replyingToComment,
}) => {
	return (
		<>
			<article
				id={`${authorUsername}-${id}`}
				className={`comment${updating ? " updating" : ""}`}
			>
				<ScoreButtons voteGiven={voteGiven} id={id} score={score} />

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
