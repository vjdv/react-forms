import React, { FormEvent, useState } from "react";
import { FormProvider } from "../hooks/useformcontext";
import { FormValidator, FormInterface } from "../types";

function Form(props: FormInterface) {
  //Permite saber si ya se intentó subir el formulario
  const [submitting, setSubmitting] = useState(false);
  const [wasSubmited, setWasSubmited] = useState(false);
  //Agrega los validadores de cada input
  const [validators] = useState<FormValidator[]>([]);
  function addValidator(validator: FormValidator) {
    validators.push(validator);
  }
  function removeValidator(validator: FormValidator) {
    const i = validators.indexOf(validator);
    validators.splice(i, 1);
  }
  //Controla el submit del formulario
  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    //ejecuta las validaciones
    Promise.all(validators.map(v => v()))
      .then(array => {
        //Si encuentra algún false, aquí se detiene
        if (array.find(b => b !== true) !== undefined) {
          if (!wasSubmited) setWasSubmited(true);
          return;
        }
        //confirma si es necesario y ejecuta onSubmit
        return props.confirm().then(b => {
          if (b) return props.onSubmit();
        });
      })
      .catch(props.onError)
      .then(() => setSubmitting(false));
  }
  //render
  return (
    <FormProvider value={{ addValidator, removeValidator, wasSubmited, submitting, state: props.state, sm: props.sm, md: props.md, lg: props.lg, xl: props.xl, xxl: props.xxl }}>
      <form onSubmit={submitHandler} className={props.className}>
        {props.children}
      </form>
    </FormProvider>
  );
}

Form.defaultProps = {
  confirm: () => Promise.resolve(true),
  onError: (error: Error) => alert(error.message),
  sm: 12
};

export default Form;
