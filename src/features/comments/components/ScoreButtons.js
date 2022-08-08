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

