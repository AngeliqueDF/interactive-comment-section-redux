const Button = ({ content, idAttribute, onClick, dataRequestType }) => {
	return (
		<button
			// attribute used to determine the kind of HTTP request to send
			data-request-type={dataRequestType}
			onClick={onClick}
			className="confirm-button"
			id={`${idAttribute ? idAttribute : ""}`}
		>
			{content}
		</button>
	);
};

export default Button;
