import { ReactNode } from "react";
import { ObjectState } from "./hooks/useobjectstate";

export type BootstrapColSize = 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1;

export type FormValidator = () => Promise<boolean>;

export interface FormContextType {
  addValidator: (validator: FormValidator) => void;
  removeValidator: (validator: FormValidator) => void;
  wasSubmited: boolean;
  submitting: boolean;
  values: ObjectState<any>;
  sm?: BootstrapColSize;
  md?: BootstrapColSize;
  lg?: BootstrapColSize;
  xl?: BootstrapColSize;
  xxl?: BootstrapColSize;
}

export interface FormInterface {
  className?: string;
  children: ReactNode;
  confirm: () => Promise<boolean>;
  onError: (error: Error) => void;
  onSubmit: () => void;
  values: ObjectState<any>;
  sm?: BootstrapColSize;
  md?: BootstrapColSize;
  lg?: BootstrapColSize;
  xl?: BootstrapColSize;
  xxl?: BootstrapColSize;
}
