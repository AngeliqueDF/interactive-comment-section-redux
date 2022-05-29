import React from "react";
import "./App.css";

import { useSelector } from "react-redux";

import CommentList from "./features/comments/components/CommentList";
import NewCommentInput from "./features/comments/components/NewCommentInput";

function App() {
	// TODO move to its reducer
	const selectComments = (state) => state.comments;

	const comments = useSelector(selectComments);

	// TODO move useSelector argument to its reducer
	const currentUser = useSelector((state) => state.currentUser);

	// TODO fetch all comments in useEffect
	return (
		<main>
			<CommentList comments={comments} currentUser={currentUser} />
			<NewCommentInput currentUser={currentUser} />
		</main>
	);
}

export default App;
