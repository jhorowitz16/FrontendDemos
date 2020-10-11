import classnames from "classnames";
import React from "react";
import styles from "./Button.module.scss";

const Button = ({ className, ...props }) => (
  <button className={classnames(styles.button, className)} {...props} />
);

export default Button;
