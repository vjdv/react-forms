import React, { ReactNode } from "react";
import { BootstrapColSize } from "../types";
import cx from "classnames";

interface ColProps {
  children: ReactNode;
  className?: string;
  sm?: BootstrapColSize;
  md?: BootstrapColSize;
  lg?: BootstrapColSize;
  xl?: BootstrapColSize;
  xxl?: BootstrapColSize;
}

function Row(props: ColProps) {
  return <div className={cx("row", props.className)}>{props.children}</div>;
}

Row.displayName = "Row";

export default Row;
