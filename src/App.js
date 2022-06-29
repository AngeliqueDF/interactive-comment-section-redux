import React from "react";
import "./App.css";

import CommentList from "./features/comments/components/CommentList";
import NewComment from "./features/comments/components/NewComment";

function App() {
	// TODO fetch all comments in useEffect
	return (
		<main>
			<CommentList comments={comments} currentUser={currentUser} />
			<NewComment currentUser={currentUser} />
		</main>
	);
}

export default App;
