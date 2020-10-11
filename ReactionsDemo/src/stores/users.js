import create from "zustand";
import socket from "../lib/socket";
import { clientEvents, serverEvents } from "../constants";

export const [useUserStore, userStoreApi] = create(set => ({
  activeUserId: null,
  users: []
}));

export const initializeUserStore = () => {
  socket.on(serverEvents.UPDATE_ALL_USERS, users => {
    userStoreApi.setState({ users });
  });
  socket.emit(clientEvents.FETCH_ALL_USERS);
};
