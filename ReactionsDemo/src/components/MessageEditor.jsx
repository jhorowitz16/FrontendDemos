import React from "react";
import Button from "./Button";
import TextInput from "./TextInput";
import { editMessage } from "../actions";
import styles from "./MessageEditor.module.scss";
import { MessageCharacterWarning } from "./MessageComposer";
import { MESSAGE_LIMIT } from "../constants";

const MessageEditor = ({ id, content, onClose, channelId }) => {
  const inputRef = React.useRef(null);

  const [inputValue, setInputValue] = React.useState(content);
  React.useLayoutEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form
      className={styles.root}
      onSubmit={async event => {
        event.preventDefault();
        await editMessage({
          messageId: id,
          channelId,
          content: inputRef.current.value,
          reactions: [],
        });
        onClose();
      }}
    >
      <MessageCharacterWarning content={inputValue} />
      <div className={styles.wrapper}>
        <TextInput
          defaultValue={content}
          className={styles.input}
          onKeyDown={e => {
            if (e.key === "Escape") {
              onClose();
            }
          }}
          onChange={e => setInputValue(e.target.value)}
          ref={inputRef}
        />
        <Button
          className={styles.button}
          type="submit"
          disabled={content.length > MESSAGE_LIMIT}
        >
          Save
        </Button>
      </div>
      <div className={styles.cancelText}>
        ESC to{" "}
        <button onClick={() => onClose()} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MessageEditor;
