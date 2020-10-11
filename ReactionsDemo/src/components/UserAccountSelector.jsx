import React from "react";
import Label from "./Label";
import Select from "./Select";
import { logIn } from "../actions";
import { useUserStore } from "../stores/users";
import styles from "./UserAccountSelector.module.scss";

const UserAccountSelector = ({ onSubmit }) => {
  const users = useUserStore(state => state.users);
  const activeUserId = useUserStore(state => state.activeUserId);

  return (
    <div className={styles.wrapper}>
      <Label>Select User</Label>
      <Select
        className={styles.select}
        onChange={event => {
          const userId =
            event.currentTarget.value === "-1"
              ? null
              : event.currentTarget.value;
          logIn(userId);
        }}
        value={activeUserId == null ? "" : activeUserId}
      >
        {[{ id: -1, username: "None" }].concat(users).map(user => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default UserAccountSelector;
