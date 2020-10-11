import React from "react";
import { useChannelStore } from "../stores/channels";
import Label from "./Label";
import List, { ListItem } from "./List";
import styles from "./ChannelsList.module.scss";

const ChannelsList = () => {
  const channels = useChannelStore(state => state.channels);
  const activeChannelId = useChannelStore(state => state.activeChannelId);
  const setActiveChannelId = useChannelStore(state => state.setActiveChannelId);

  return (
    <div className={styles.wrapper}>
      <Label>Channels</Label>
      <List>
        {channels.map(channel => (
          <ListItem
            key={channel.id}
            isActive={activeChannelId === channel.id}
            onClick={() => setActiveChannelId(channel.id)}
          >
            #{channel.name}
          </ListItem>
        ))}
      </List>
      <ul className={styles.channelList}></ul>
    </div>
  );
};

export default ChannelsList;
