import { createSlice } from "@reduxjs/toolkit";

export const initialState = [
	{
		id: 0,
		image: {
			png: "./images/avatars/image-amyrobson.png",
			webp: "./images/avatars/image-amyrobson.webp",
		},
		username: "amyrobson",
	},
	{
		id: 1,
		image: {
			png: "./images/avatars/image-maxblagun.png",
			webp: "./images/avatars/image-maxblagun.webp",
		},
		username: "maxblagun",
	},
	{
		id: 2,
		image: {
			png: "./images/avatars/image-ramsesmiron.png",
			webp: "./images/avatars/image-ramsesmiron.webp",
		},
		username: "ramsesmiron",
	},
	{
		id: 3,
		image: {
			png: "./images/avatars/image-juliusomo.png",
			webp: "./images/avatars/image-juliusomo.webp",
		},
		username: "juliusomo",
	},
];

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
});

export const selectUserById = (state, userID) =>
	state.users.find((user) => user.id === userID);

export const selectUsernames = (state) => {
	return state.users.map((user) => {
		const object = {
			id: user.id,
			username: user.username,
		};
		return object;
	});
};

export default usersSlice.reducer;
