import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import service from "./../../utils/services";

export const initialState = [];

export const getAllComments = createAsyncThunk(
	"comments/getAllComments",
	async () => {
		const data = await service.getAllComments();
		return { comments: data };
	}
);

export const addReply = createAsyncThunk(
	"comments/addReply",
	async (payload) => {
		const data = await service.addReply(payload);

		return { addedReply: data };
	}
);

export const addComment = createAsyncThunk(
	"comments/addComment",
	async (newComment) => {
		const data = await service.addComment(newComment);

		return { addedComment: data };
	}
);

export const commentsSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {
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

			// The user never voted for this comment
			if (!commentVoted.voteGiven) {
				commentVoted.score += 1;
				commentVoted.voteGiven = "increment";
			} else if (commentVoted.voteGiven === "decrement") {
				// The comment score was  previously decremented by the user. First cancel the decrement, then increment by one
				commentVoted.score += 2;
				commentVoted.voteGiven = "increment";
			} else if (commentVoted.voteGiven === "increment") {
				// The comment was already incremented, cancel the incrementation and remove 1 to the score to reset the value
				delete commentVoted.voteGiven;
				commentVoted.score -= 1;
			}
		},
		decrementVote: (state, action) => {
			const commentVoted = state.find(
				(comment) => comment.id === action.payload.id
			);

			// The user never voted for this comment OR the comment score was  previously incremented by the user
			if (!commentVoted.voteGiven) {
				commentVoted.score -= 1;
				commentVoted.voteGiven = "decrement";
			} else if (commentVoted.voteGiven === "increment") {
				// The comment score was  previously incremented by the user. First cancel the decrement, then decrement by one
				commentVoted.score -= 2;
				commentVoted.voteGiven = "decrement";
			} else if (commentVoted.voteGiven === "decrement") {
				// The comment was already decremented, cancel the decrementation and add 1 to the score to reset the value
				delete commentVoted.voteGiven;
				commentVoted.score += 1;
			}
		},
	},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(getAllComments.fulfilled, (state, action) => {
			return (state = action.payload.comments);
		});
		builder.addCase(addComment.fulfilled, (state, action) => {
			state.push(action.payload.addedComment);
		});
		builder.addCase(addReply.fulfilled, (state, action) => {
			state.push(action.payload.addedReply);
			const rootComment = state.find(
				(comment) => comment.id === action.payload.addedReply.replyingToComment
			);
			rootComment.replies.push(action.payload.addedReply.id);
		});
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

export const { decrementVote, incrementVote, deleteComment, updateComment } =
	commentsSlice.actions;

export default commentsSlice.reducer;
