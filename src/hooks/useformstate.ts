import { useState } from "react";

export type FormState<T> = [T, (k: string, v: any) => void, (o: T) => void];

function useFormState<T>(initialState: T): FormState<T> {
  const [state, setState] = useState(initialState);
  const setValue = (k: string, v: any) => {
    setState(oldstate => {
      const newstate: any = { ...oldstate };
      newstate[k] = v;
      return newstate;
    });
  };
  return [state, setValue, setState];
}

export default useFormState;
