// keys for actiontypes
export const ActionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  UPDATE_NAME: 'UPDATE_NAME',
  UPDATE_TYPE: 'UPDATE_TYPE',
  UPDATE_MODE: 'UPDATE_MODE',
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