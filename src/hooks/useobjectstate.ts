import { useState } from "react";

export type ObjectState<T> = [T, (k: string, v: any) => void, (o: T) => void];

function useObjectState<T>(initialState: T): ObjectState<T> {
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

export default useObjectState;
