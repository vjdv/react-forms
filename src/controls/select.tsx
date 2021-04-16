import React, { useMemo, ChangeEvent } from "react";
import CSS from "csstype";
import cx from "classnames";

export interface SelectProps {
  className?: string;
  disabled: boolean;
  id?: string;
  labelField: string;
  onChange?: (val: string) => void;
  options: any[];
  style?: CSS.Properties;
  value: string;
  valueField: string;
}

const defaultProps = {
  disabled: false,
  labelField: "label",
  valueField: "value"
};

function Select(props: SelectProps) {
  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (props.disabled) return;
    if (props.onChange === undefined) throw new Error("onChange was not set in Select");
    props.onChange(e.target.value);
  };
  const exists = useMemo(() => props.options.findIndex(o => o[props.valueField] === props.value) !== -1, [props.options, props.value]);
  return (
    <select id={props.id} className={cx("form-select", props.className)} value={exists ? props.value : ""} style={props.style} onChange={changeHandler} disabled={props.disabled}>
      {!exists && <option value="" />}
      {props.options.map((o, i) => (
        <option value={o[props.valueField]} key={i}>
          {o[props.labelField]}
        </option>
      ))}
    </select>
  );
}

Select.displayName = "Select";
Select.defaultProps = defaultProps;

export default Select;
