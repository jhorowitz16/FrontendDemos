import React from "react";
import UserAccountSelector from "../components/UserAccountSelector";
import styles from "./Authorization.module.scss";
import UserAccountCreator from "../components/UserAccountCreator";

const Authorization = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        <UserAccountSelector />
        <UserAccountCreator />
      </div>
    </div>
  );
};

export default Authorization;
