import useFormContext from "../hooks/useformcontext";

export default function useValue(name: string): [any, (x: any) => void] {
  const formContext = useFormContext();
  const [state, setValueState] = formContext.values;
  const value = state[name];
  if (value === undefined) throw new Error(`${name} is undefined in form values`);
  const setValue = (x: string) => setValueState(name, x);
  return [value, setValue];
}
