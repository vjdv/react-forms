import React from "react";
import TextInput from "../controls/text-input";
import useValue from "../hooks/usevalue";
import FormValidation from "./form-validation";

type Transform = "lowercase" | "uppercase" | "normalize";

export interface FormTextInputProps {
  accept?: RegExp;
  autoFocus: boolean;
  className?: string;
  disabled?: boolean;
  id: string;
  maxLength: number;
  name: string;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  required: boolean;
  transforms: Transform[];
}

const defaultProps = {
  autoFocus: false,
  disabled: false,
  maxLength: 100,
  required: true,
  transforms: []
};

function FormTextInput(props: FormTextInputProps) {
  const [value, setValue] = useValue(props.name);
  //render
  return (
    <>
      <TextInput
        id={props.id}
        className={props.className}
        value={value}
        onChange={setValue}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        disabled={props.disabled}
        maxLength={props.maxLength}
        placeholder={props.placeholder}
        autoFocus={props.autoFocus}
        required={false}
      />
      {props.required && <FormValidation htmlFor={props.id} message="This field is required" validator={() => value !== ""} />}
    </>
  );
}

FormTextInput.displayName = "FormTextInput";
FormTextInput.defaultProps = defaultProps;

export default FormTextInput;
