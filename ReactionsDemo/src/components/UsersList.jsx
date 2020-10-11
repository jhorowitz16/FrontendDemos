import classnames from "classnames";
import React from "react";
import { useUserStore } from "../stores/users";
import Label from "./Label";
import List, { ListItem } from "./List";
import styles from "./UsersList.module.scss";

const UsersList = () => {
  const users = useUserStore(state => state.users);
  const activeUserId = useUserStore(state => state.activeUserId);

  return (
    <div className={styles.wrapper}>
      <Label>Users</Label>
      <List>
        {users.map(user => (
          <ListItem
            className={classnames(styles.user, {
              [styles.userMe]: user.id === activeUserId,
              [styles.userOnline]: user.isOnline
            })}
            key={user.id}
          >
            <span
              className={classnames(styles.statusIndicator, {
                [styles.statusIndicatorOnline]: user.isOnline
              })}
            />
            {user.username}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UsersList;
