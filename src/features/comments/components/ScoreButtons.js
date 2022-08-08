import { useDispatch } from "react-redux";
import { incrementVote } from "../commentsSlice";

const VoteButton = ({ voteType, voteGiven, content, clickFunction }) => {
	return (
		<button
			style={{
				color:
					voteGiven === undefined
						? "var(--light-grayish-blue)"
						: voteGiven === voteType
						? "var(--moderate-blue)"
						: "var(--light-grayish-blue)",
			}}
			data-votetype={voteType}
			onClick={clickFunction}
		>
			{content}
		</button>
	);
};

const ScoreButtons = ({ voteGiven, id, score }) => {
	const dispatch = useDispatch();
	const addVote = (e) => {
		dispatch(incrementVote({ id }));
	};

	return (
		<div className="score-buttons">
			<VoteButton
				voteGiven={voteGiven}
				voteType="increment"
				content="+"
				clickFunction={addVote}
			/>

			<span
				style={{
					color: voteGiven
						? "var(--moderate-blue)"
						: "var(--light-grayish-blue)",
				}}
			>
				{score}
			</span>

			<VoteButton
				voteGiven={voteGiven}
				voteType="decrement"
				content="-"
			/>
		</div>
	);
};

export default ScoreButtons;
