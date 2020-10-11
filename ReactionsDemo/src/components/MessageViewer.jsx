import classnames from "classnames";
import formatRelative from "date-fns/formatRelative";
import React from "react";
import { useChannelStore } from "../stores/channels";
import { editMessage } from "../actions";
import { useMessageStore } from "../stores/messages";
import { useUserStore } from "../stores/users";
import MessageEditor from "./MessageEditor";
import styles from "./MessageViewer.module.scss";

// Reaction Enum for mapping reaction ids.
const REACTION_ENUM = Object.freeze({"thumb": 0, "heart": 1, "laugh": 2});

/**
  Toggles the reaction for a given reaction type (thumb/heart/laugh) for the
  signed in user and the selected message.
*/
function toggleReaction(reaction, userId, messageId, channelId, content, oldReactions=[]) {
  const repeatIndex = oldReactions.findIndex(oldReaction =>
    Object.keys(oldReaction).includes(userId) &&
    Object.values(oldReaction).includes(reaction));

  const reactions = repeatIndex === -1 ?
    oldReactions.concat([{[userId]:reaction}]) :
    oldReactions.slice(0, repeatIndex).concat(oldReactions.slice(repeatIndex +1));

  editMessage({
    messageId,
    channelId,
    content,
    reactions,
  });
}

const Message = ({ content, createdAt, id, userId, channelId, reactions }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const user = useUserStore(state =>
    state.users.find(user => user.id === userId)
  );
  const activeUserId = useUserStore(state => state.activeUserId);
  const dateInstance = React.useMemo(() => new Date(createdAt), [createdAt]);

  const flattened = (reactions && reactions.map(reaction => Object.values(reaction)).flat()) || [];
  const thumbs = flattened.filter(x => x === REACTION_ENUM.thumb).length;
  const hearts = flattened.filter(x => x === REACTION_ENUM.heart).length;
  const laughs = flattened.filter(x => x === REACTION_ENUM.laugh).length;

  return (
    <div className={styles.message}>
      <div className={styles.metadata}>
        {user == null ? null : (
          <span className={styles.username}>{user.username}</span>
        )}
        <span className={styles.timestamp}>
          {formatRelative(dateInstance, new Date())}
        </span>
      </div>
      {isEditing ? (
        <MessageEditor
          channelId={channelId}
          id={id}
          content={content}
          onClose={() => setIsEditing(false)}
        />
      ) : (
        content
      )}
      {userId === activeUserId && !isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className={styles.editButton}
        >
          Edit
        </button>
      ) : null}

      <div className={styles.reactions}>
        <button
          onClick={() => toggleReaction(REACTION_ENUM.thumb, activeUserId, id, channelId, content, reactions)}
        >
          👍 &nbsp;{thumbs}
        </button>
        <button
          onClick={() => toggleReaction(REACTION_ENUM.heart, activeUserId, id, channelId, content, reactions)}
        >
          ❤️  &nbsp; {hearts}
        </button>
        <button
          onClick={() => toggleReaction(REACTION_ENUM.laugh, activeUserId, id, channelId, content, reactions)}
        >
          😂 &nbsp; {laughs}
        </button>
      </div>
    </div>
  );
};

const MessageViewer = () => {
  const allMessages = useMessageStore(state => state.messages);
  const activeChannelId = useChannelStore(state => state.activeChannelId);
  const messagesForActiveChannel = React.useMemo(
    () => allMessages.filter(message => message.channelId === activeChannelId),
    [activeChannelId, allMessages]
  );
  const isEmpty = messagesForActiveChannel.length === 0;

  return (
    <div
      className={classnames(styles.wrapper, { [styles.wrapperEmpty]: isEmpty })}
    >
      {isEmpty ? (
        <div className={styles.empty}>
          No messages{" "}
          <span aria-label="Sad face" role="img">
            😢
          </span>
        </div>
      ) : (
        messagesForActiveChannel.map(message => (
          <Message
            channelId={activeChannelId}
            key={message.id}
            id={message.id}
            content={message.content}
            createdAt={message.createdAt}
            userId={message.userId}
            reactions={message.reactions}
          />
        ))
      )}
    </div>
  );
};

export default MessageViewer;
