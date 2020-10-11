import React from "react";
import { createChannel } from "../actions";
import Label from "./Label";
import TextInput from "./TextInput";
import Button from "./Button";
import styles from "./ChannelCreator.module.scss";

const ChannelCreator = ({ onSubmit }) => {
  const inputRef = React.useRef(null);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (inputRef.current == null || inputRef.current.value === "") return;
        createChannel(inputRef.current.value);
        inputRef.current.value = "";
      }}
      className={styles.wrapper}
    >
      <Label>Create Channel</Label>
      <div className={styles.inputWrapper}>
        <TextInput
          className={styles.input}
          placeholder="Channel Name"
          ref={inputRef}
        />
        <Button className={styles.button} type="submit">
          +
        </Button>
      </div>
    </form>
  );
};

export default ChannelCreator;
