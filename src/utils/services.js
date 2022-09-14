/**
 * A service to send requests to the backend.
 */
const API_URL =
	process.env.REACT_APP_API_URL || "http://localhost:5000/api/comments/";

const getAllComments = async () => {
	const response = await fetch(API_URL);
	const json = await response.json();
	return json;
};

const addComment = async (newComment) => {
	const ROUTE = "/newComment";

	const response = await fetch(API_URL + ROUTE, {
		method: "post",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ newComment }),
	});

	const json = await response.json();

	return json;
};

const addReply = async (newReply) => {
	const ROUTE = "/newReply";

	const response = await fetch(API_URL + ROUTE, {
		method: "post",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newReply),
	});

	const json = await response.json();

	return json;
};

const services = { getAllComments, addComment, addReply };
export default services;
