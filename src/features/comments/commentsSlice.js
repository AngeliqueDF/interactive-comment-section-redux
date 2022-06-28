import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// TODO add action when replying to comment, to conditionnally display NewReply

const initialState = [
	{
		id: 0,
		content:
			"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
		createdAt: "1 month ago",
		score: 12,
		user: 0,
		replies: [],
	},
	{
		id: 1,
		content:
			"Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
		createdAt: "2 weeks ago",
		score: 5,
		user: 1,
		replies: [2, 3],
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
		addComment: () => {
			// TODO add comment
			// // POST a reply
		},
		deleteComment: () => {
			// DELETE  comment
		},
		updateComment: () => {
			// PUT comment
		},
		handleCommentChange: () => {},
	},
});

export default commentsSlice.reducer;
