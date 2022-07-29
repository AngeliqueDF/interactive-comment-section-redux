import React from "react";
import "./App.css";

import CommentList from "./features/comments/components/CommentList";
import NewComment from "./features/comments/components/NewComment";

function App() {
	return (
		<main>
			<CommentList />
			<NewComment />
		</main>
	);
}

export default App;
