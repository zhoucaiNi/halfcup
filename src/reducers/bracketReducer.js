import { produce, current } from 'immer';
import { ActionTypes } from '../actions';
import { collection, query, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const initialState = {
  name: "Untitled Bracket",
  type: 1,
  mode: 0,
  count: 4,
  admin: "uid",
  description: "ping ping ping",
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
        matchUID: "matchUID2",
        nextMatch: "matchUID3",
        name: "matchName",
        state: "current",
        participants: [
          { teamUID: "TBD1", isWinner: false },
          { teamUID: "TBD4", isWinner: false },
        ],
      },
      {
        matchUID: "matchUID1",
        nextMatch: "matchUID3",
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
        matchUID: "matchUID3",
        nextMatch: "null",
        name: "Final",
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
    case ActionTypes.UPDATE_WHOLE_BRACKET:
      Object.keys(action.payload).forEach(key => {
        draftState[key] = action.payload[key];
      });
      console.log(draftState)
      break;
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
      if (action.payload.length === 0) {
        draftState.name = "Untitled Bracket";
      } else {
        draftState.name = action.payload;
      }
      break;
    case ActionTypes.UPDATE_DESCRIPTION:
      if (action.payload.length === 0) {
        draftState.description = "ping ping ping";
      } else {
        draftState.description = action.payload;
      }
      break;
    case ActionTypes.UPDATE_TYPE:
      console.log(action.payload)
      draftState.type = action.payload;
      break;
    case ActionTypes.UPDATE_MODE:
      draftState.mode = action.payload;
      break;
    case ActionTypes.UPDATE_TEAM_NAME:
      const { teamName, teamUID } = action.payload;
      draftState.teams[teamUID].teamName = teamName;
      break;
    case ActionTypes.UPDATE_WINNER:

      const { roundIndex: rI, matchIndex: mI, participantIndex: pI } = action.payload;

      draftState.matches[rI][mI].participants[pI].isWinner = true;
      draftState.matches[rI][mI].participants[1 - pI].isWinner = false;

      let nextRoundIndex = parseInt(rI) + 1;
      let nextMatchIndex = Math.floor(mI / 2);

      // Check if the match exists (it might not, if this is the final round)
      if (draftState.matches[nextRoundIndex] && draftState.matches[nextRoundIndex][nextMatchIndex]) {
        const nextParticipantIndex = mI % 2 === 0 ? 0 : 1;
        const nextMatchUID = draftState.matches[nextRoundIndex][nextMatchIndex].participants[nextParticipantIndex].teamUID
        if (nextMatchUID === "TBD" || nextMatchUID === draftState.matches[rI][mI].participants[pI].teamUID) {
          // Determine which participant slot the winner should occupy in the next match.
          // Assuming winners of even-indexed matches go to the first slot and 
          // winners of odd-indexed matches go to the second slot.
          const nextParticipantIndex = mI % 2 === 0 ? 0 : 1;
          // Set the winner in the next match
          draftState.matches[nextRoundIndex][nextMatchIndex].participants[nextParticipantIndex].teamUID = draftState.matches[rI][mI].participants[pI].teamUID;
        } else {
          const nextParticipantIndex = mI % 2;
          // Set the winner in the next match
          draftState.matches[nextRoundIndex][nextMatchIndex].participants[0].isWinner = false;
          draftState.matches[nextRoundIndex][nextMatchIndex].participants[1].isWinner = false;
          draftState.matches[nextRoundIndex][nextMatchIndex].participants[nextParticipantIndex].teamUID = draftState.matches[rI][mI].participants[pI].teamUID;
          console.log(nextRoundIndex, nextMatchIndex)
          while (draftState.matches[nextRoundIndex + 1] && draftState.matches[nextRoundIndex + 1][Math.floor(nextMatchIndex / 2)]) {
            nextRoundIndex = nextRoundIndex + 1;
            const nextParticipantIndex = nextMatchIndex % 2;
            nextMatchIndex = Math.floor(nextMatchIndex / 2);

            console.log("inside the loop", nextRoundIndex, nextMatchIndex, nextParticipantIndex)

            // console.log(nextRoundIndex, nextMatchIndex, nextParticipantIndex)
            draftState.matches[nextRoundIndex][nextMatchIndex].participants[0].isWinner = false;
            draftState.matches[nextRoundIndex][nextMatchIndex].participants[1].isWinner = false;
            draftState.matches[nextRoundIndex][nextMatchIndex].participants[nextParticipantIndex].teamUID = 'TBD'
          }
        }
      }
      console.log(current(draftState))
      break;
    case ActionTypes.UPDATE_FIREBASE:
      console.log(action.payload)
      const { tournamentUID, tournament } = action.payload

      break;
    case ActionTypes.RESET_INITIAL_STATE:
      console.log("bruh")
      console.log(initialState)
      return initialState;
    // break;
    default:
      console.log("default")
      return draftState;
  }
}, initialState);


const BracketMakerReducer = produce((draftState, action = {}) => {
}, initialState);

export default BracketReducer;