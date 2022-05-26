import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	image: {
		png: "./images/avatars/image-juliusomo.png",
		webp: "./images/avatars/image-juliusomo.webp",
	},
	username: "juliusomo",
};
// TODO add loading state for current user ?
const currentUserSlice = createSlice({
	name: "currentUser",
	initialState,
});

export default currentUserSlice.reducer;
