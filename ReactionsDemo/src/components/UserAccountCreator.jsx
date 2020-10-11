import React from "react";
import Button from "./Button";
import { createUser } from "../actions";
import Label from "./Label";
import TextInput from "./TextInput";
import styles from "./UserAccountCreator.module.scss";

const UserAccountCreator = ({ onSubmit }) => {
  const inputRef = React.useRef(null);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (inputRef.current == null || inputRef.current.value === "") return;
        createUser(inputRef.current.value);
        inputRef.current.value = "";
      }}
      className={styles.wrapper}
    >
      <Label>Create User</Label>
      <div className={styles.content}>
        <TextInput
          className={styles.input}
          placeholder="Username"
          ref={inputRef}
        />
        <Button className={styles.button} type="submit">
          Add
        </Button>
      </div>
    </form>
  );
};

export default UserAccountCreator;
