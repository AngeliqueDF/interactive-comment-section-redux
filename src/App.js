import React from "react";
import "./App.css";

import { useSelector } from "react-redux";

import CommentList from "./features/comments/components/CommentList";
import NewComment from "./features/comments/components/NewComment";

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
			<NewComment currentUser={currentUser} />
		</main>
	);
}

export default App;
