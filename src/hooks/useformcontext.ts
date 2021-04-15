import { createContext, useContext } from "react";
import { FormContextType } from "../types";

export const FormContext = createContext<FormContextType | null>(null);
export const FormProvider = FormContext.Provider;
export const FormConsumer = FormContext.Consumer;

export default function useFormContext(): FormContextType {
  const context = useContext<FormContextType | null>(FormContext);
  if (context === null) throw new Error("useFormContext must be in Form hierchary");
  return context;
}
