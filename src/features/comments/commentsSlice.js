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

	// TODO Toggle getting a reply (frontend only)

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
				action.payload.replyingToAuthor.username,
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
			};

			// Add the comment to the state
			state.push(newComment);

			const repliedToComment = state.find(
				(comment) =>
					findRootComment(action.payload.replyingToComment) === comment.id
			);
			// Finally, to display the newly added comment, push it to the list of replies of its root parent comment.
			repliedToComment.replies.push(newComment.id);
		},
		updateComment: () => {
			// PUT comment
		},
		handleCommentChange: () => {},
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

export const { addComment, addReply } = commentsSlice.actions;
export default commentsSlice.reducer;
