const ScoreButtons = ({
	id,
	score,
	replyingTo,
	incrementScore,
	decrementScore,
}) => {
	const handleIncrement = (e) => {
		incrementScore(id, replyingTo);
		console.log(id);
	};
	const handleDecrement = (e) => {
		decrementScore(id, replyingTo);
		console.log(id);
	};

	return (
		<div className="score-buttons">
			<button data-score-action="increment" onClick={handleIncrement}>
				+
			</button>
			<span>{score}</span>
			<button data-score-action="decrement" onClick={handleDecrement}>
				-
			</button>
		</div>
	);
};

export default ScoreButtons;
