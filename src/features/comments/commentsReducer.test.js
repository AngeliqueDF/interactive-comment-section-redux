import commentsReducer, { initialState } from "./commentsSlice";

describe("commentsReducer", () => {
	test("Returns the correct initial state when called with an undefined state", () => {
		const state = {};
		const action = {
			type: "no action",
		};

		const newState = commentsReducer(undefined, action);
		expect(newState).toEqual(initialState);
	});
	test("Adds a new comment to the state with comments/addComment", () => {
		jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));

		const state = [];
		const action = {
			type: "comments/addComment",
			payload: {
				id: 0,
				content:
					"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
				createdAt: "1 month ago",
				user: 0,
			},
		};
		const newState = commentsReducer(state, action);

		expect(typeof newState[0].id).toEqual("number");
		expect(newState[0].content).toEqual(action.payload.content);
		expect(newState[0].createdAt).toEqual(new Date().toDateString());
		expect(newState[0].score).toEqual(0);
		expect(newState[0].user).toEqual(action.payload.user);
		expect(newState[0].replies).toEqual([]);
		expect(newState[0].replyingToUser).toEqual(null);
		expect(newState[0].replyingToComment).toEqual(null);

		jest.useRealTimers();
	});
});
