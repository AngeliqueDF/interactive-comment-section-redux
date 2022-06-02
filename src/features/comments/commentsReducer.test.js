import commentsReducer from "./commentsSlice";

describe("commentsReducer", () => {
	test("Adds a new comment to the state with comments/addComment", () => {
		const state = [];
		const action = {
			type: "comments/addComment",
			payload: {
				id: 1,
				content:
					"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
				createdAt: "1 month ago",
				score: { value: 12, voteGiven: null },
				user: {
					image: {
						png: "./images/avatars/image-amyrobson.png",
						webp: "./images/avatars/image-amyrobson.webp",
					},
					username: "amyrobson",
				},
				gettingReply: false,
				replies: [],
			},
		};
		const newState = commentsReducer(state, action);
		expect(newState).toHaveLength(1);
		expect(newState).toContain(action.payload);
	});
});
