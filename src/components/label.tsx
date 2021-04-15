import React, { ReactNode } from "react";
import cx from "classnames";

interface LabelProps {
  className?: string;
  children?: ReactNode;
  htmlFor?: string;
  text?: string;
}

function Label(props: LabelProps) {
  return (
    <label htmlFor={props.htmlFor} className={cx("form-label", props.className)}>
      {props.text && `${props.text}:`}
      {props.children}
    </label>
  );
}

export default Label;
