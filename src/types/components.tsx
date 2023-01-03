import {ElementStates} from "./element-states";
import {nanoid} from "nanoid";

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

export interface IStateSorting {
  inputValue: string;
  buttonLoaders: {
    ascendingBtn: boolean,
    descendingBtn: boolean,
    newArrayBtn: boolean,
  };
  buttonBlocks: {
    ascendingBtn: boolean,
    descendingBtn: boolean,
    newArrayBtn: boolean,
    bubbleRadioInput: boolean,
    selectRadioInput: boolean,
  };
  radioInput: string;
  array: IArrayColumns[];
}

export interface IChart {
  array: number[];
}

export interface IArrayColumns {
  number: number;
  key: string;
  state: ElementStates
}

export type TFibonacci = (n: number, updateState: React.Dispatch<any>) => void;
export type TBubbleSort = (array: IArrayColumns[], type: 'ascending' | 'descending') => void;
export type TSelectSort = (array: IArrayColumns[], type: 'ascending' | 'descending') => void;