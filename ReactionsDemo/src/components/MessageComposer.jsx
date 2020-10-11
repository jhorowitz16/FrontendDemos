import React from "react";
import classNames from "classnames";
import Button from "./Button";
import { createMessage } from "../actions";
import TextInput from "./TextInput";
import { useActiveChannel } from "../hooks/channels";
import { useUserStore } from "../stores/users";
import { MESSAGE_LIMIT } from "../constants";
import styles from "./MessageComposer.module.scss";

const MESSAGE_LIMIT_BUFFER = 8;

export const MessageCharacterWarning = ({ content }) => {
  const charactersLeft = MESSAGE_LIMIT - content.length;
  if (charactersLeft > MESSAGE_LIMIT_BUFFER) {
    return null;
  }
  return (
    <div
      className={classNames(styles.characterLimit, {
        [styles.characterLimitExceeded]: charactersLeft < 0
      })}
    >
      {charactersLeft}
    </div>
  );
};

const MessageComposer = () => {
  const activeUserId = useUserStore(state => state.activeUserId);
  const activeChannel = useActiveChannel();
  const inputRef = React.useRef(null);
  const isDisabled = activeUserId == null || activeChannel == null;

  const [inputValue, setInputValue] = React.useState("");
  const onChange = e => {
    setInputValue(e.target.value);
  };

  return (
    <form
      className={styles.root}
      onSubmit={event => {
        event.preventDefault();
        if (inputRef.current != null) {
          const value = inputRef.current.value;
          if (value !== "" && value.length <= MESSAGE_LIMIT) {
            createMessage(activeChannel.id, inputRef.current.value);
            inputRef.current.value = "";
            inputRef.current.focus();
          }
        }
      }}
    >
      <MessageCharacterWarning content={inputValue} />
      <div className={styles.wrapper}>
        <TextInput
          className={styles.input}
          disabled={isDisabled}
          onChange={onChange}
          placeholder={
            activeChannel == null
              ? "Select a channel"
              : activeUserId == null
              ? "Select a user"
              : `Message #${activeChannel.name}`
          }
          ref={inputRef}
        />
        <Button
          className={styles.button}
          type="submit"
          disabled={isDisabled || inputValue.length > MESSAGE_LIMIT}
        >
          Send
        </Button>
      </div>
    </form>
  );
};

export default MessageComposer;
