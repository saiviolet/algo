import {ElementStates} from "./element-states";

export interface ILetter {
  letter: string;
  key: string;
  state: ElementStates;
}

export interface IState {
  buttonLoader: boolean;
  buttonDisabled: boolean;
  inputValue: string;
  string: ILetter[] | null;
}
