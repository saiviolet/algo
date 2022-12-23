import {ElementStates} from "./element-states";

export interface ILetter {
  letter: string;
  key: string;
  state: ElementStates;
}

export interface IStateString {
  buttonLoader: boolean;
  buttonDisabled: boolean;
  inputValue: string;
  string: ILetter[] | null;
}

export interface IStateFibonacci {
  buttonLoader: boolean;
  buttonDisabled: boolean;
  inputValue: string;
  number: number | null;
  array: number[];
}

export type TFibonacci = (n: number, updateState: React.Dispatch<any>) => void;
