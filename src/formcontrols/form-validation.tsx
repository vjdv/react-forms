import React, { useCallback, useEffect, useState } from "react";
import useFormContext from "../hooks/useformcontext";

interface FormValidationProps {
  htmlFor?: string;
  message?: string;
  validator: () => Promise<string | boolean> | string | boolean;
}

/**
 * Allows to add validations to FormContext
 * @param props
 * @returns
 */
function FormValidation(props: FormValidationProps) {
  const formContext = useFormContext();
  const [warning, setWarning] = useState("");
  //Transforms validator into boolean
  const validator = useCallback(
    () =>
      Promise.resolve()
        .then(props.validator)
        .then(o => {
          if (typeof o === "string") {
            if (o === "") return true;
            setWarning(o);
            return false;
          }
          if (typeof o === "boolean") {
            if (o) return true;
            setWarning(props.message || "Please take actions");
            return false;
          }
          return false;
        }),
    [props.validator]
  );
  //input listeners, remove warning on focus
  useEffect(() => {
    if (!props.htmlFor) return;
    const onFocus = () => setWarning("");
    const elements = document.querySelectorAll(props.htmlFor);
    elements.forEach(e => e.addEventListener("focus", onFocus));
    return () => elements.forEach(e => e.removeEventListener("focus", onFocus));
  }, [props.htmlFor]);
  //adds/removes validators from context
  useEffect(() => {
    formContext.addValidator(validator);
    return () => formContext.removeValidator(validator);
  }, [validator]);
  //render
  const isInvalid = formContext.wasSubmited && warning !== "";
  return <>{isInvalid && <div className="invalid-feedback d-block">{warning}</div>}</>;
}

export default FormValidation;
