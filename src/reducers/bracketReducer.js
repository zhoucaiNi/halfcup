import { produce } from 'immer';
import { ActionTypes } from '../actions';

// const initialState = {
//   name: "",
//   type: 1,
//   mode: 0,
//   count: 10,
//   admin: "uid",
//   partcipants: { "uid": "user1", "uid2": "user3", "uid3": "user3" },
//   teams: {
//     "user1user2": {
//       teamName: "teamName",
//     },
//     "user3user4": {
//       teamName: "teamName2",
//     }

//   },
//   matches: {
//     "matchUID": {
//       nextMatch: "matchUID2",
//       name: "matchName",
//       state: "done",
//       participants: [
//         {
//           teamUID: "user1user2",
//           isWinner: true,
//         },
//         {
//           teamUID: "user3user4",
//           isWinner: false,
//         },
//       ],

//     }
//   },
// };

const initialState = {
  name: "",
  type: 1,
  mode: 0,
  count: 10,
  admin: "uid",
  participants: {
    "uid1": { name: "user1" },
    "uid2": { name: "user2" },
    "uid3": { name: "user3" },
  },
  teams: {
    "team1": { members: ["uid1", "uid2"], teamName: "team1" },
    "team2": { members: ["uid3"], teamName: "team2" },
    "TBD": { members: ["null", "null"], teamName: "TBD" },
  },
  matches: {
    "round1": [
      {
        matchUID: "matchUID",
        nextMatch: "matchUID2",
        name: "matchName",
        state: "done",
        participants: [
          { teamUID: "team1", isWinner: true },
          { teamUID: "team2", isWinner: false },
        ],
      },
      {
        matchUID: "matchUID",
        nextMatch: "matchUID2",
        name: "matchName",
        state: "done",
        participants: [
          { teamUID: "team1", isWinner: true },
          { teamUID: "team2", isWinner: false },
        ],
      },
      {
        matchUID: "matchUID",
        nextMatch: "matchUID2",
        name: "matchName",
        state: "done",
        participants: [
          { teamUID: "team1", isWinner: true },
          { teamUID: "team2", isWinner: false },
        ],
      },
      {
        matchUID: "matchUID",
        nextMatch: "matchUID2",
        name: "matchName",
        state: "done",
        participants: [
          { teamUID: "team1", isWinner: true },
          { teamUID: "team2", isWinner: false },
        ],
      },
      // more matches
    ],
    "round2": [
      // matches
      {
        matchUID: "matchUID",
        nextMatch: "matchUID2",
        name: "matchName",
        state: "current",
        participants: [
          { teamUID: "team1", isWinner: false },
          { teamUID: "team2", isWinner: false },
        ],
      },
      {
        matchUID: "matchUID",
        nextMatch: "matchUID2",
        name: "matchName",
        state: "done",
        participants: [
          { teamUID: "team1", isWinner: true },
          { teamUID: "team2", isWinner: false },
        ],
      },
    ],
    "round3": [
      {
        matchUID: "matchUID",
        nextMatch: "null",
        name: "Final",
        state: "current",
        participants: [
          { teamUID: "TBD", isWinner: false },
          { teamUID: "TBD", isWinner: false },
        ],
      }
    ],
  },
};


const BracketReducer = produce((draftState, action = {}) => {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      draftState.count += 1;
      break;
    case ActionTypes.DECREMENT:
      draftState.count -= 1;
      break;
    case ActionTypes.UPDATE_NAME:
      draftState.name = action.payload;
      break;
    case ActionTypes.UPDATE_TYPE:
      console.log(action.payload)
      draftState.type = action.payload;
      break;
    case ActionTypes.UPDATE_MODE:
      draftState.mode = action.payload;
      break;
    default:
      console.log("default")
      return draftState;
  }
}, initialState);

export default BracketReducer;