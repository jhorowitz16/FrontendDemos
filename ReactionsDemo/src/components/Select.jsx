import classnames from "classnames";
import React from "react";
import styles from "./Select.module.scss";

const Select = ({ className, ...props }) => (
  <select className={classnames(styles.select, className)} {...props} />
);

export default Select;
