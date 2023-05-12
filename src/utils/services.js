import axios from "axios";

/**
 * A service to send requests to the backend.
 */
const API_URL =
	process.env.REACT_APP_API_URL || "http://localhost:5000/api/comments/";

const getAllComments = async () => {
	try {
		const response = await axios({
			url: API_URL,
			method: "get",
			auth: {
				username: process.env.REACT_APP_CLIENT_ID,
				password: process.env.REACT_APP_CLIENT_SECRET,
			},
		});

		return response.data;
	} catch (error) {
		console.log(error);
	}
};

const addComment = async (newComment) => {
	const ROUTE = "/newComment";

	try {
		const response = await axios({
			url: API_URL + ROUTE,
			method: "post",
			auth: {
				username: process.env.REACT_APP_CLIENT_ID,
				password: process.env.REACT_APP_CLIENT_SECRET,
			},
			data: { newComment },
		});

		return response.data;
	} catch (error) {
		console.log(error);
	}
};

const addReply = async (payload) => {
	const ROUTE = "/newReply";

	try {
		const response = await axios({
			url: API_URL + ROUTE,
			method: "post",
			auth: {
				username: process.env.REACT_APP_CLIENT_ID,
				password: process.env.REACT_APP_CLIENT_SECRET,
			},
			data: {
				newComment: payload.newComment,
				allComments: payload.allComments,
			},
		});

		return response.data;
	} catch (error) {
		console.log(error);
	}
};

const updateComment = async ({ id, newContent }) => {
	const ROUTE = "/" + id;

	try {
		const response = await axios({
			url: API_URL + ROUTE,
			method: "put",
			auth: {
				username: process.env.REACT_APP_CLIENT_ID,
				password: process.env.REACT_APP_CLIENT_SECRET,
			},
			data: {
				newContent,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

const deleteComment = async ({ commentID }) => {
	const ROUTE = "/" + commentID;

	try {
		const response = await axios({
			url: API_URL + ROUTE,
			method: "delete",
			auth: {
				username: process.env.REACT_APP_CLIENT_ID,
				password: process.env.REACT_APP_CLIENT_SECRET,
			},
		});

		return response.data;
	} catch (error) {
		console.log(error);
	}
};

const services = {
	getAllComments,
	addComment,
	addReply,
	deleteComment,
	updateComment,
};
export default services;
