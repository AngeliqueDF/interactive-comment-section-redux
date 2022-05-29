import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "../features/comments/commentsSlice";
import currentUserReducer from "../features/currentUser/currentUserSlice";

// TODO apply store enhancer to add gettingReply, gettingUpdated

export const store = configureStore({
	reducer: {
		currentUser: currentUserReducer,
		comments: commentsReducer,
	},
});
