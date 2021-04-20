import React, { useMemo } from "react";
import CSS from "csstype";
import useValue from "../hooks/usevalue";
import Select from "../controls/select";
import FormValidation from "./form-validation";

export interface FormSelectProps {
  className?: string;
  disabled: boolean;
  id?: string;
  labelField: string;
  name: string;
  options: any[];
  required: boolean;
  style?: CSS.Properties;
  valueField: string;
}

const defaultProps = {
  disabled: false,
  labelField: "label",
  required: true,
  valueField: "value",
};

function FormSelect(props: FormSelectProps) {
  const [value, setValue] = useValue(props.name);
  const exists = useMemo(() => props.options.findIndex((o) => o[props.valueField] === value) !== -1, [props.options, value]);
  const id = props.id || props.name;
  return (
    <>
      <Select
        id={id}
        className={props.className}
        value={value}
        style={props.style}
        onChange={setValue}
        disabled={props.disabled}
        options={props.options}
        labelField={props.labelField}
        valueField={props.valueField}
      />
      {props.required && <FormValidation htmlFor={"#" + id} message="This field is required" validator={() => exists} />}
    </>
  );
}

FormSelect.displayName = "FormSelect";
FormSelect.defaultProps = defaultProps;

export default FormSelect;
