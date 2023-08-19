import { produce, current } from 'immer';
import { ActionTypes } from '../actions';

const initialState = {
  name: "",
  type: 1,
  mode: 0,
  count: 4,
  admin: "uid",
  participants: {
  },
  teams: {
    "BYE": { members: [null, null], teamName: "BYE", seed: -9999 },
    "TBD1": { members: ["null", "null"], teamName: "Team 1", seed: 1 },
    "TBD2": { members: ["null", "null"], teamName: "Team 2", seed: 2 },
    "TBD3": { members: ["null", "null"], teamName: "Team 3", seed: 3 },
    "TBD4": { members: ["null", "null"], teamName: "Team 4", seed: 4 },
    "TBD": { members: ["null", "null"], teamName: "TBD", seed: -9999 }
  },
  matches: {
    98: [
      {
        matchUID: "matchUID",
        nextMatch: "matchUID2",
        name: "matchName",
        state: "current",
        participants: [
          { teamUID: "TBD1", isWinner: false },
          { teamUID: "TBD4", isWinner: false },
        ],
      },
      {
        matchUID: "matchUID",
        nextMatch: "matchUID2",
        name: "matchName",
        state: "current",
        participants: [
          { teamUID: "TBD3", isWinner: false },
          { teamUID: "TBD2", isWinner: false },
        ],
      },
    ],
    99: [
      {
        matchUID: "matchUID2",
        nextMatch: "matchUID3",
        name: "matchName",
        state: "current",
        participants: [
          { teamUID: "TBD", isWinner: false },
          { teamUID: "TBD", isWinner: false },
        ],
      },
    ],
  },
};


const BracketReducer = produce((draftState, action = {}) => {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      draftState.count += 1;
      const placeholderKey = `TBD${draftState.count}`;
      const tempTeamName = `Team ${draftState.count}`;
      draftState.teams[placeholderKey] = { members: ["null", "null"], teamName: tempTeamName, seed: draftState.count };
      const roundKeys = Object.keys(draftState.matches);
      const minRoundKey = Math.min(...roundKeys.map(Number));

      // if num is a power of 2
      const num = draftState.count - 1;
      let foundTeamUID = null;
      let highestSeed = 0;
      let matchIndex = null;
      let participantIndex = null;
      let matchID = null;
      let roundKey = num && !(num & num - 1) ? minRoundKey : minRoundKey + 1;
      const round = draftState.matches[roundKey];

      for (let i = 0; i < round.length; i++) {
        const match = round[i];
        for (let j = 0; j < match.participants.length; j++) {
          const participant = match.participants[j];
          if (draftState.teams[participant.teamUID].seed > highestSeed) {
            matchIndex = i;
            participantIndex = j;
            highestSeed = draftState.teams[participant.teamUID].seed;
            matchID = match.matchUID;
          }
        }
      }

      if (participantIndex != null && matchIndex !== null) {
        foundTeamUID = round[matchIndex].participants[participantIndex].teamUID;
        round[matchIndex].participants[participantIndex].teamUID = "TBD";
      }

      if (foundTeamUID) {
        let placeholderMatch = {
          matchUID: `matchUID${draftState.count}`,
          nextMatch: matchID,
          name: "matchName",
          state: "current",
          participants: [
            { teamUID: foundTeamUID, isWinner: false },
            { teamUID: placeholderKey, isWinner: false },
          ],
        };

        if ((matchIndex * 2 + participantIndex) % 2 !== 0) {
          placeholderMatch.participants.reverse();
        }

        if (num && !(num & num - 1)) {
          draftState.matches[minRoundKey - 1] = Array(draftState.matches[minRoundKey].length * 2).fill({
            matchUID: `temp`,
            nextMatch: "null",
            name: "matchName",
            state: "pending",
            participants: [
              { teamUID: "BYE", isWinner: false },
              { teamUID: "BYE", isWinner: false },
            ],
          });
          draftState.matches[minRoundKey - 1][matchIndex * 2 + participantIndex] = placeholderMatch;
        } else {
          draftState.matches[minRoundKey][matchIndex * 2 + participantIndex] = placeholderMatch;
        }
      }
      break;

    case ActionTypes.DECREMENT:
      if (draftState.count > 4) {
        draftState.count -= 1;


        const roundKeys = Object.keys(draftState.matches);
        const minRoundKey = Math.min(...roundKeys.map(Number));

        const round = draftState.matches[minRoundKey];
        let matchIndex = null;
        let participantIndex = null;
        let teamToUpdate = null;
        // find the latest team 
        for (let i = 0; i < round.length; i++) {
          const match = round[i];

          for (let j = 0; j < match.participants.length; j++) {
            const participant = match.participants[j];
            //  get the team with the highest seed that is not "TBD"
            if (draftState.teams[participant.teamUID].seed === draftState.count + 1) {
              matchIndex = i;
              participantIndex = j;
              participant.teamUID = "BYE";

              if (j === 1) {
                teamToUpdate = match.participants[0].teamUID;
                match.participants[0].teamUID = "BYE";
              } else {
                teamToUpdate = match.participants[1].teamUID;
                match.participants[1].teamUID = "BYE";
              }
              match.state = "pending";
              break;
            }
          }
          if (teamToUpdate !== null) {
            break;
          }
        }

        if (matchIndex != null && participantIndex != null) {
          draftState.matches[minRoundKey + 1][Math.floor(matchIndex / 2)].participants[matchIndex % 2].teamUID = teamToUpdate;
        }

        const num = draftState.count;
        if (num && !(num & num - 1)) {
          delete draftState.matches[minRoundKey];
        }

        // Find and delete the last placeholder team
        const placeholderKeyToDelete = `TBD${draftState.count + 1}`;
        console.log(placeholderKeyToDelete)
        if (draftState.teams[placeholderKeyToDelete]) {
          delete draftState.teams[placeholderKeyToDelete];
        }


      }
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