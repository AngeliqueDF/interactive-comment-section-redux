import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { randomID, trimContent } from "../../utils/helper";

export const initialState = [
	{
		id: 0,
		content:
			"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
		createdAt: "1 month ago",
		score: 12,
		user: 0,
		replies: [],
		replyingToUser: null,
		replyingToComment: null,
	},
	{
		id: 1,
		content:
			"Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
		createdAt: "2 weeks ago",
		score: 5,
		user: 1,
		replies: [2, 3],
		replyingToUser: null,
		replyingToComment: null,
		voteGiven: "increment",
	},
	{
		id: 2,
		content:
			"If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
		createdAt: "1 week ago",
		score: 4,
		user: 2,
		replies: [3],
		replyingToUser: 1,
		replyingToComment: 1,
		voteGiven: "decrement",
	},
	{
		id: 3,
		content:
			"I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
		createdAt: "2 days ago",
		score: 2,
		user: 3,
		replies: [],
		replyingToUser: 2,
		replyingToComment: 2,
		voteGiven: "increment",
	},
];

export const fetchComments = createAsyncThunk(
	"comments/fetchAllComments",
	async () => {
		// TODO fetch comments from the API
	}
);

// TODO create thunks
// const addComment = (second) => { third }
// const updateComment = (second) => { third }
// const deleteComment = (second) => { third }

export const commentsSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {
		addComment: (state, action) => {
			// if the content is empty, exit
			if (!action.payload.content.length) return;

			const newComment = {
				...action.payload,
				id: randomID(),
				createdAt: new Date().getTime(),
				score: 0,
				replies: [],
				replyingToUser: null,
				content: action.payload.content,
				replyingToComment: null,
			};

			state.push(newComment);
		},
		addReply: (state, action) => {
			const trimmedContent = trimContent(
				action.payload.replyingToAuthor,
				action.payload.content
			);
			// If the new comment's content only contains "@" followed by a username, it means the comment is actually empty. In that case, we stop executing the code.
			if (!trimmedContent.length) return;

			/**
			 * Finds the root comment parent of a given comment. Needed for TopLevelComment to work correctly.
			 */
			const findRootComment = (id) => {
				// Find a comment in the state by its id.
				let currentComment = state.find((comment) => comment.id === id);

				// If the current comment is a reply to another comment...
				if (currentComment.replyingToComment != null) {
					// ...store the other comment's id in currentComment.
					currentComment = currentComment.replyingToComment;
					// Then call the function again
					return findRootComment(currentComment);
				}

				// Once we reach a comment that has null in replyingToComment, return its id.
				return currentComment.id;
			};
			const rootCommentID = findRootComment(action.payload.replyingToComment);

			const newComment = {
				...action.payload,
				id: randomID(),
				createdAt: new Date().getTime(),
				score: 0,
				replies: [],
				replyingToUser: action.payload.replyingToUser,
				content: trimmedContent,
				replyingToComment: action.payload.replyingToComment,
			};

			// Add the comment to the state
			state.push(newComment);

			const rootComment = state.find((comment) => comment.id === rootCommentID);
			// Finally, to display the newly added comment, push it to the list of replies of its root parent comment.
			rootComment.replies.push(newComment.id);
		},
		deleteComment: (state, action) => {
			const deleteID = action.payload.commentID;
			let commentToDelete = state.find((comment) => comment.id === deleteID);

			// If the comment being deleted is a reply, it has a root parent. Firstly, check rootComment is a valid id (neither null nor undefined)
			if (!(commentToDelete.replyingToComment == null)) {
				const findRootCommentID = (id) => {
					let currentComment = state.find((comment) => comment.id === id);
					if (currentComment.replyingToComment === null) {
						return currentComment.id;
					} else {
						const currentCommentID = currentComment.replyingToComment;
						return findRootCommentID(currentCommentID);
					}
				};
				const rootCommentID = findRootCommentID(deleteID);

				// Find the root comment using its id
				const rootComment = state.find(
					(comment) => comment.id === rootCommentID
				);

				// Remove the id of the comment being deleted from the replies array of its root comment
				rootComment.replies.splice(
					rootComment.replies.findIndex((id) => id === deleteID)
				);
			}

			// Remove the comment from the comments in the state
			const deleteIndex = state.findIndex((comment) => comment.id === deleteID);
			state.splice(deleteIndex, 1);
		},
		updateComment: (state, action) => {
			const updateID = state.findIndex(
				(comment) => comment.id === action.payload.id
			);
			state[updateID].content = action.payload.newContent;
		},
		incrementVote: (state, action) => {
			const commentVoted = state.find(
				(comment) => comment.id === action.payload.id
			);

			// The user never voted for this comment OR the comment score was  previously decremented by the user
			if (!commentVoted.voteGiven || commentVoted.voteGiven === "decrement") {
				commentVoted.score += 1;
				commentVoted.voteGiven = "increment";
			} else if (commentVoted.voteGiven === "increment") {
				// The comment was already incremented, cancel the incrementation and remove 1 to the score to reset the value
				delete commentVoted.voteGiven;
				commentVoted.score -= 1;
			}
		},
	},
});
// Creates the comments array used in the store. Other slices of the state are reference by their id.
export const selectComments = (state) => {
	return state.comments.map((comment) => {
		return {
			...comment,
			// populate the replies array with the full information of each comment
			replies: comment.replies
				? comment.replies.map((replyID) =>
						state.comments.find((comment) => comment.id === replyID)
				  )
				: [],
			// the id of the user who wrote the comment or `null`
			replyingToUser: comment.replyingToUser
				? state.users.find((user) => user.id === comment.replyingToUser)
				: comment.replyingToUser,
		};
	});
};

export const {
	incrementVote,
	addComment,
	addReply,
	deleteComment,
	updateComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;
