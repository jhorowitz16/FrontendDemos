import React from "react";
import { useChannelStore } from "../stores/channels";

export const useActiveChannel = () => {
  const activeChannelId = useChannelStore(state => state.activeChannelId);
  const channels = useChannelStore(state => state.channels);
  return React.useMemo(
    () => channels.find(channel => channel.id === activeChannelId),
    [channels, activeChannelId]
  );
};
