/**
 * A service to send requests to the backend.
 */
const API_URL = "http://localhost:5000/api/comments/";

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

export default { addComment };
