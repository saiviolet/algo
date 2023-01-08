import {ElementStates} from "./element-states";
import {nanoid} from "nanoid";
import {DLList, DLListNode} from "../utils/structures";


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
export interface IArrayCircles {
  number?: string;
  key: string;
  state: ElementStates;
  top?: boolean;
  index?: number;
  letter?: undefined | string;
}

export interface IQueueCircles {
  key: string;
  state: ElementStates;
  index: number;
  letter: undefined | string;
  head: string;
  tail: string;
}

export interface IStackPage {
  inputValue: string;
  buttonLoaders: {
    addBtn: boolean,
    deleteBtn: boolean,
    clearBtn: boolean,
  };
  buttonBlocks: {
    addBtn: boolean,
    deleteBtn: boolean,
    clearBtn: boolean,
  };
  array: IArrayCircles[],
}

export interface IQueuePage {
  inputValue: string;
  buttonLoaders: {
    addBtn: boolean,
    deleteBtn: boolean,
    clearBtn: boolean,
  };
  buttonBlocks: {
    addBtn: boolean,
    deleteBtn: boolean,
    clearBtn: boolean,
  };
  circles: IQueueCircles[],
}

export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  getArray: () => T[];
}

export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
  getArray: () => T[];
  getTail: () => number;
  getHead: () => number;
  getSize: () => number;
}

export interface INode<T> {
  data: T;
  next: DLListNode<T>| null;
  prev: DLListNode<T>| null;
}

export interface INodeDLList<T> {
  head: DLListNode<T> | null;
  tail: DLListNode<T> | null;
  addInHead(data: T): DLList<T>;
  addInTail(data: T): DLList<T>;
  addByIndex(data: T): DLList<T>;
  deleteFromHead(): DLList<T> | null;
  deleteFromTail(): DLList<T> | null;
  deleteByIndex(): DLList<T> | null;
  returnArray: () => DLList<T>[];
}