const ScoreButtons = ({ id, score, replyingTo }) => {
	return (
		<div className="score-buttons">
			<button data-score-action="increment">+</button>
			<span>{score}</span>
			<button data-score-action="decrement">-</button>
		</div>
	);
};

export default ScoreButtons;
