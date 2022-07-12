module.exports = {
	// Moves caret at the end of an editable area
	moveCaretToContentEditableEnd(querySelector) {
		// from https://newbedev.com/how-to-move-cursor-to-end-of-contenteditable-entity
		let range, selection;

		//Create a range (a range is a like the selection but invisible)
		range = document.createRange();

		//Select the entire contents of the element with the range
		range.selectNodeContents(document.querySelector(querySelector));

		//collapse the range to the end point. false means collapse to end rather than the start
		range.collapse(false);

		//get the selection object (allows you to change selection)
		selection = window.getSelection();

		//remove any selections already made
		selection.removeAllRanges();

		//make the range you have just created the visible selection
		selection.addRange(range);
	},
	moveCaretToTextareaEnd(querySelector) {
		const element = document.querySelector(querySelector);
		element.selectionStart = element.value.length;
	},
	randomID: () => Number((Math.random() * 1000000).toFixed(0)),
	/**
	 * Trims the comment to only keep the actual content. Avoids duplicated "@username "
	 */
	trimContent: (username, content) => {
		const usernameLength = username.length + 2;
		const trimContent = content.substring(usernameLength, content.length);
		return trimContent;
	},
	formatDate: (date) => {
		const relative = new Intl.RelativeTimeFormat("en-GB", { numeric: "auto" });
		const then = Math.floor(new Date(date));
		const now = new Date();
		const days = (then - now) / 86400000;
		const getRelativeDate = (formatUnit, unitInDays = 1) =>
			relative.format(Math.trunc(days / unitInDays), formatUnit);

		console.log("days %d", days);

		if (days <= -365) {
			console.log(relative.format(Math.trunc(days / -365), "year"));
			return getRelativeDate("year", -365);
		} else if (days <= -30) {
			console.log(relative.format(Math.trunc(days / -30), "month"));
			return getRelativeDate("month", -30);
		} else if (days <= -7) {
			console.log(relative.format(Math.trunc(days / -7), "week"));
			return getRelativeDate("week", -7);
		} else if (days > -7) {
			console.log(relative.format(Math.trunc(days), "days"));
			return getRelativeDate("days");
		}
	},
};
