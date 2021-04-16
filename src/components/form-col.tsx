import React, { ReactNode } from "react";
import useFormContext from "../hooks/useformcontext";
import { BootstrapColSize } from "../types";
import cx from "classnames";
import Label from "./label";

interface ColProps {
  children: ReactNode;
  className?: string;
  htmlFor?: string;
  label?: string;
  sm?: BootstrapColSize;
  md?: BootstrapColSize;
  lg?: BootstrapColSize;
  xl?: BootstrapColSize;
  xxl?: BootstrapColSize;
}

function Col(props: ColProps) {
  const formContext = useFormContext();
  const sm = props.sm || formContext.sm;
  const md = props.md || formContext.md;
  const lg = props.lg || formContext.lg;
  const xl = props.xl || formContext.xl;
  const xxl = props.xxl || formContext.xxl;
  const col = !sm && !md && !lg && !xl && !xxl;
  return (
    <div className={cx(props.className, col && "col", sm && "col-sm-" + sm, md && "col-md-" + md, lg && "col-lg-" + lg, xl && "col-xl-" + xl, xxl && "col-xxl-" + xxl)}>
      {props.label && <Label text={props.label} htmlFor={props.htmlFor} />}
      {props.children}
    </div>
  );
}

Col.displayName = "Col";

export default Col;
