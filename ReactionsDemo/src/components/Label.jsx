import React from "react";
import styles from "./Label.module.scss";

const Label = ({ children }) => (
  <label className={styles.label}>{children}</label>
);

export default Label;
