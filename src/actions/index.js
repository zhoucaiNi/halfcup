import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

// keys for actiontypes
export const ActionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  UPDATE_NAME: 'UPDATE_NAME',
  UPDATE_TYPE: 'UPDATE_TYPE',
  UPDATE_MODE: 'UPDATE_MODE',
  UPDATE_DESCRIPTION: 'UPDATE_DESCRIPTION',
  UPDATE_TEAM_NAME: 'UPDATE_TEAM_NAME',
  UPDATE_WINNER: 'UPDATE_WINNER',
  UPDATE_WHOLE_BRACKET: "UPDATE_WHOLE_BRACKET",
  UPDATE_FIREBASE: "UPDATE_FIREBASE",
  RESET_INITIAL_STATE: "RESET_INITIAL_STATE",
};

export function increment() {
  return {
    type: ActionTypes.INCREMENT,
    payload: null,
  };
}

export function decrement() {
  return {
    type: ActionTypes.DECREMENT,
    payload: null,
  };
}

export function updateName(name) {
  return {
    type: ActionTypes.UPDATE_NAME,
    payload: name,
  };
}

export function updateDescription(description) {
  return {
    type: ActionTypes.UPDATE_DESCRIPTION,
    payload: description,
  };
}

export function updateType(type) {
  return {
    type: ActionTypes.UPDATE_TYPE,
    payload: type,
  };
}

export function updateMode(mode) {
  return {
    type: ActionTypes.UPDATE_MODE,
    payload: mode,
  };
}

export function updateTeamName(teamName, teamUID) {
  return {
    type: ActionTypes.UPDATE_TEAM_NAME,
    payload: { teamName, teamUID },
  };
}

export function updateWinner(roundIndex, matchIndex, participantIndex) {
  return {
    type: ActionTypes.UPDATE_WINNER,
    payload: { roundIndex, matchIndex, participantIndex },
  };
}

export const updateWinnerAndSync = (rIndex, mIndex, pIndex, tournamentUID) => {
  return async (dispatch, getState) => {
    dispatch(updateWinner(rIndex, mIndex, pIndex));
    const updatedMatches = getState().bracket.matches;
    try {
      await updateDoc(doc(db, "tournaments", tournamentUID), {
        matches: updatedMatches
      });
    } catch (error) {
      // Handle or dispatch an error action
    }
  };
};


export function updateWholeBracket(bracket) {
  return {
    type: ActionTypes.UPDATE_WHOLE_BRACKET,
    payload: bracket,
  };
}

export function updateFirebase(tournamentUID, bracket) {
  return {
    type: ActionTypes.UPDATE_FIREBASE,
    payload: { tournamentUID, bracket },
  };
}

export function resetInitialState() {
  return {
    type: ActionTypes.RESET_INITIAL_STATE,
  }
}