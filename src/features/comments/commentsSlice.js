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
		replyingToUser: null,
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
