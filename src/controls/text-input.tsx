import React, { useRef } from "react";
import cx from "classnames";

type Transform = "lowercase" | "uppercase" | "normalize";

export interface TextInputProps {
  accept?: RegExp;
  autoFocus: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
  maxLength: number;
  onBlur?: () => void;
  onChange?: (str: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  required: boolean;
  transforms: Transform[];
  value: string;
}

const defaultProps = {
  autoFocus: false,
  disabled: false,
  maxLength: 100,
  required: false,
  transforms: []
};

function TextInput(props: TextInputProps) {
  const input = useRef<HTMLInputElement>(null);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange === undefined) throw new Error("onChange was not provided to Input");
    let newValue: string = e.target.value;
    for (const transform of props.transforms) {
      if (transform === "lowercase") newValue = newValue.toLowerCase();
      else if (transform === "uppercase") newValue = newValue.toUpperCase();
      else if (transform === "normalize") newValue = newValue.normalize("NFD").replace(/[\u0300-\u036F]/g, "");
    }
    if (props.accept) {
      if (newValue === "" || props.accept.test(newValue)) props.onChange(newValue);
    } else props.onChange(newValue);
  };
  //render
  return (
    <input
      ref={input}
      id={props.id}
      className={cx("form-control", props.className)}
      value={props.value}
      onChange={changeHandler}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      disabled={props.disabled}
      maxLength={props.maxLength}
      placeholder={props.placeholder}
      autoFocus={props.autoFocus}
      required={props.required}
    />
  );
}

TextInput.displayName = "TextInput";
TextInput.defaultProps = defaultProps;

export default TextInput;
