import create from "zustand";
import socket from "../lib/socket";
import { clientEvents, serverEvents } from "../constants";

export const [useMessageStore, api] = create(set => ({
  messages: []
}));

export const initializeMessageStore = () => {
  socket.on(serverEvents.UPDATE_ALL_MESSAGES, messages =>
    api.setState({ messages })
  );
  socket.emit(clientEvents.FETCH_ALL_MESSAGES);
};
