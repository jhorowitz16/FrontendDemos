import classnames from "classnames";
import React from "react";
import Button from "../components/Button";
import ChannelsList from "../components/ChannelsList";
import ChannelCreator from "../components/ChannelCreator";
import Label from "../components/Label";
import { logOut } from "../actions";
import MessageViewer from "../components/MessageViewer";
import MessageComposer from "../components/MessageComposer";
import UsersList from "../components/UsersList";
import styles from "./Chat.module.scss";
import { useActiveUser } from "../hooks/users";

const Chat = () => {
  const activeUser = useActiveUser();

  return (
    <div className={styles.wrapper}>
      <div className={styles.channels}>
        <div className={styles.channelsContentFixed}>
          <ChannelCreator />
        </div>
        <div className={styles.channelsWrapper}>
          <ChannelsList />
        </div>
        {activeUser == null ? null : (
          <div
            className={classnames(
              styles.logOutWrapper,
              styles.channelsContentFixed
            )}
          >
            <Label>Logged in as</Label>
            <div className={styles.logOutContent}>
              <div className={styles.logOutUser}>{activeUser.username}</div>
              <Button className={styles.logOutButton} onClick={logOut}>
                Log Out
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className={styles.chat}>
        <div className={styles.chatWrapper}>
          <MessageViewer />
        </div>
        <div className={styles.messageComposerWrapper}>
          <MessageComposer />
        </div>
      </div>
      <div className={styles.users}>
        <UsersList />
      </div>
    </div>
  );
};

export default Chat;
