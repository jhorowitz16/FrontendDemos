import create from "zustand";
import socket from "../lib/socket";
import { clientEvents, serverEvents } from "../constants";

export const [useChannelStore, channelStoreApi] = create((set, get) => ({
  activeChannelId: null,
  channels: [],
  setActiveChannelId: activeChannelId => set({ activeChannelId })
}));

export const initializeChannelStore = () => {
  socket.on(serverEvents.UPDATE_ALL_CHANNELS, channels => {
    const currentState = channelStoreApi.getState();
    channelStoreApi.setState({
      channels,
      activeChannelId:
        currentState.activeChannelId == null && channels.length > 0
          ? channels[0].id
          : currentState.activeChannelId
    });
  });
  socket.emit(clientEvents.FETCH_ALL_CHANNELS);
};
