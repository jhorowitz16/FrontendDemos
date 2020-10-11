import classnames from "classnames";
import React from "react";
import styles from "./List.module.scss";

const List = ({ children }) => <ul className={styles.list}>{children}</ul>;

export const ListItem = ({
  children,
  className,
  isActive = false,
  onClick
}) => {
  const InnerTag = onClick == null ? "span" : "button";

  return (
    <li className={styles.listItemWrapper}>
      <InnerTag
        className={classnames(
          styles.listItem,
          {
            [styles.listItemInteractive]: onClick != null,
            [styles.listItemActive]: isActive
          },
          className
        )}
        onClick={onClick}
      >
        {children}
      </InnerTag>
    </li>
  );
};

export default List;
