# Discord 2.0

Help! Through an unfortunate accident in our lab, we've lost all of the Discord code. We need your help to rebuild from scratch as quickly as possible!

The app and the backend are now written entirely in JavaScript, using React in the frontend and NodeJS for the backend. We've built an MVP with users, channels, and messages, but we need your help adding one of our favorite features — _message reactions_.

Please spend up to two hours implementing the frontend and backend for a message reaction feature. **Important** — when you're done, commit your changes to the included git repository, zip up this directory and submit it back to us. Please edit the last section of this README file with a short blurb telling us what tradeoffs you made and how you might improve your solution if you had more time.

## Task details

- Users should be able to react to any message with any of the following emojis: 👍 ❤️ 😂
- Users may react to a single message with more than one emoji, but only once per emoji — clicking on a reaction emoji should act like a toggle, so clicking on the same emoji twice should result in no reaction
- Each reaction should include the sum of users who reacted to the message with the given emoji (e.g. if five users reacted to a message with 👍, the UI should display `👍 5`)
- The reaction should indicate whether the current user has reacted with that emoji or not (through a different background color, or other means)
- Avoid introducing new, glaringly-obvious security vulnerabilities
- Architect your database changes assuming that this API will run in a distributed system with eventually-consistent databases — concurrent user reactions should be handled gracefully

## Example UI

![Reactions UI demonstration](example.gif)

## Running locally

- `yarn` — Installs dependencies
- `yarn start` — Starts the Webpack and Node servers
- `yarn client` — Starts the Webpack server
- `yarn server` — Starts the Node server

## Tradeoffs and follow-ups

See Video Walkthrough: https://www.loom.com/share/c1fb4a97fe0a4421ba1683650fbc9523

Tradeoffs:

Reaction Storage
- Storing messages as a list of {id: reaction} results in N copies of the reaction id being stored.
- An alternative would be to map the reaction type to the list of user ids ({0: <ID-one>, <ID-two> etc.})
- This alternative would be more space efficient for the db, but more difficult when writing new entries

Reusing the Edit endpoint
- Reducing a reaction update to another way of editing a message made the server changes minimal
- No need for a new endpoint by reusing the Edit one.
- Needed to change the user validation logic to allow "reaction-editing" another user's message
- Could explore creating a new endpoint specifically for reactions
- The server call for the endpoint currently takes many unneeded parameters because of the shared logic with edit.
- Switching over to a designated reaction endpoint would clean up the code here.


Fast Follows:

- Display which users have reacted in which way onHover.
- Clean up duplicated parameters (the many IDs) that are passed background
- Could take advantage of a Set or similar object that's easier to iterate through on
  the Clientside when checking if specific ids are already in the reaction list.
- Could explore a User or Message object that could be shared in place of the ID strings
