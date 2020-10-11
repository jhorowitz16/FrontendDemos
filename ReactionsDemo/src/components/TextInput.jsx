import classnames from "classnames";
import React from "react";
import styles from "./TextInput.module.scss";

const TextInput = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={classnames(styles.input, className)}
    type="text"
    {...props}
  />
));

export default TextInput;
