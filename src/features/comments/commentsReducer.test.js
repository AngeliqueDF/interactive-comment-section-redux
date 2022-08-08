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
				user: 0,
			},
		};
		const newState = commentsReducer(state, action);

		expect(typeof newState[0].id).toEqual("number");
		expect(newState[0].content).toEqual(action.payload.content);
		expect(newState[0].createdAt).toEqual(new Date().getTime());
		expect(newState[0].score).toEqual(0);
		expect(newState[0].user).toEqual(action.payload.user);
		expect(newState[0].replies).toEqual([]);
		expect(newState[0].replyingToUser).toEqual(null);
		expect(newState[0].replyingToComment).toEqual(null);

		jest.useRealTimers();
	});

	test("Adds a new reply to the state with comments/addReply", () => {
		jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));

		const ROOT_COMMENT_ID = 987;

		/**
		 * The id of the comment being answered to.
		 */
		const ANSWERING_TO_COMMENT_ID = 123;
		/**
		 * The id of the commenter being answered to.
		 */
		const ANSWERING_TO_USER_ID = 567;

		const state = [
			{
				id: ROOT_COMMENT_ID,
				content:
					"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
				createdAt: "1 month ago",
				score: 12,
				user: 0,
				replies: [1],
				replyingToUser: null,
				replyingToComment: null,
			},
			{
				id: ANSWERING_TO_COMMENT_ID,
				content:
					"If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
				createdAt: "1 week ago",
				score: 4,
				user: ANSWERING_TO_USER_ID,
				replies: [],
				replyingToUser: 0,
				replyingToComment: 0,
			},
		];

		// In the browser, the content of the comment would be prepended with "@" followed by the username.
		const ANSWERING_TO_USERNAME = "comment author getting an answer's username";
		const NEW_REPLY_CONTENT =
			"Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!";

		/**
		 * Concatenates "@" + the root comment username + the comment content. The result is stored in action.payload.content.
		 */
		const formatNewContent = () =>
			`@${ANSWERING_TO_USERNAME} ${NEW_REPLY_CONTENT}`;

		const action = {
			type: "comments/addReply",
			payload: {
				content: formatNewContent(),
				score: 0,
				user: 3,
				replies: [],
				replyingToUser: ANSWERING_TO_USER_ID,
				replyingToAuthor: ANSWERING_TO_USERNAME,
				replyingToComment: ROOT_COMMENT_ID,
			},
		};
		const newState = commentsReducer(state, action);

		// Find the added comment by its trimmed content.
		const newReply = newState.find(
			(comment) => comment.content === NEW_REPLY_CONTENT
		);

		expect(newReply).toBeDefined();
		expect(typeof newReply.id).toEqual("number");
		expect(newReply.content).toEqual(NEW_REPLY_CONTENT);
		expect(newReply.createdAt).toEqual(new Date().getTime());
		expect(newReply.score).toEqual(0);
		expect(newReply.user).toEqual(action.payload.user);
		expect(newReply.replies).toEqual([]);
		expect(newReply.replyingToUser).toEqual(ANSWERING_TO_USER_ID);

		// Check replyingToComment refers to the root comment, not the comment being answered to.
		expect(newReply.replyingToComment).toEqual(ROOT_COMMENT_ID);
		jest.useRealTimers();
	});

	test("Removes a comment from the state with comments/deleteComment", () => {
		const state = [
			{
				id: 1,
				content:
					"Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
				createdAt: "2 weeks ago",
				score: 5,
				user: 1,
				replies: [],
				replyingToUser: null,
				replyingToComment: null,
			},
		];

		const action = {
			type: "comments/deleteComment",
			payload: {
				commentID: 1,
			},
		};

		const newState = commentsReducer(state, action);
		expect(newState).toHaveLength(0);
		expect(newState.findIndex((comment) => comment.id === 1)).toBe(-1);
	});

	test("Updates the content of a comment with comments/updateComment", () => {
		const state = [
			{
				id: 1,
				content:
					"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
				createdAt: "1 month ago",
				score: 12,
				user: {
					image: {
						png: "./images/avatars/image-amyrobson.png",
						webp: "./images/avatars/image-amyrobson.webp",
					},
					username: "amyrobson",
				},
				replies: [],
				replyingToUser: null,
				replyingToComment: null,
			},
		];

		const action = {
			type: "comments/updateComment",
			payload: {
				id: 1,
				newContent: "new content",
			},
		};

		const newState = commentsReducer(state, action);
		expect(newState).toHaveLength(1);
		expect(newState[0].content).toEqual(action.payload.newContent);
	});
	test("Increments the score", () => {
		const state = [
			{
				id: 1,
				content:
					"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
				createdAt: "1 month ago",
				score: 12,
				user: {
					image: {
						png: "./images/avatars/image-amyrobson.png",
						webp: "./images/avatars/image-amyrobson.webp",
					},
					username: "amyrobson",
				},
				replies: [],
				replyingToUser: null,
				replyingToComment: null,
			},
		];

		const action = {
			type: "comments/incrementVote",
			payload: {
				id: 1,
			},
		};

		const newState = commentsReducer(state, action);
		expect(newState[0].score).toEqual(13);
	});
	test("Removes an already added increment vote", () => {
		const state = [
			{
				id: 1,
				content:
					"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
				createdAt: "1 month ago",
				score: 13,
				user: {
					image: {
						png: "./images/avatars/image-amyrobson.png",
						webp: "./images/avatars/image-amyrobson.webp",
					},
					username: "amyrobson",
				},
				replies: [],
				replyingToUser: null,
				replyingToComment: null,
				voteGiven: "increment",
			},
		];

		const action = {
			type: "comments/incrementVote",
			payload: {
				id: 1,
			},
		};

		const newState = commentsReducer(state, action);
		expect(newState[0].score).toEqual(12);
		expect(newState[0].voteGiven).toEqual(undefined);
	});

	test("Decrements the score", () => {
		const state = [
			{
				id: 1,
				content:
					"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
				createdAt: "1 month ago",
				score: 12,
				user: {
					image: {
						png: "./images/avatars/image-amyrobson.png",
						webp: "./images/avatars/image-amyrobson.webp",
					},
					username: "amyrobson",
				},
				replies: [],
				replyingToUser: null,
				replyingToComment: null,
			},
		];

		const action = {
			type: "comments/decrementVote",
			payload: {
				id: 1,
			},
		};

		const newState = commentsReducer(state, action);
		expect(newState[0].score).toEqual(11);
	});

});
