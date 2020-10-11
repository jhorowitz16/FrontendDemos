import keyMirror from "key-mirror";

export const localStorageKeys = keyMirror({
  USER_ID: null
});

export const clientEvents = keyMirror({
  FETCH_ALL_MESSAGES: null,
  FETCH_ALL_CHANNELS: null,
  FETCH_ALL_USERS: null,
  CREATE_CHANNEL: null,
  CREATE_MESSAGE: null,
  EDIT_MESSAGE: null,
  CREATE_USER: null,
  LOG_IN: null,
  LOG_OUT: null
});

export const serverEvents = keyMirror({
  UPDATE_ALL_MESSAGES: null,
  UPDATE_ALL_CHANNELS: null,
  UPDATE_ALL_USERS: null
});

export const MESSAGE_LIMIT = 256;
