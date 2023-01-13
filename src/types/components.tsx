import {ElementStates} from "./element-states";
import {nanoid} from "nanoid";
import {LinkedList, LListNode} from "../utils/structures";
import React, {JSXElementConstructor, ReactElement} from "react";

export type TFibonacci = (n: number, updateState: React.Dispatch<any>) => void;
export type TBubbleSort = (array: IArrayColumns[], type: 'ascending' | 'descending') => void;
export type TSelectSort = (array: IArrayColumns[], type: 'ascending' | 'descending') => void;

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

export interface IArrayInLIst {
  head: ReactElement | string;
  tail: string | ReactElement;
  letter: string;
  index: number;
  state: ElementStates;
  key: string
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

export interface IListPage {
  inputValue: string,
  inputIndex: string,
  buttonLoaders: {
    addInHead: boolean,
    addInTail: boolean,
    addByIndex: boolean,
    deleteFromHead: boolean,
    deleteFromTail: boolean,
    deleteByIndex: boolean,
  },
  buttonBlocks: {
    addInHead: boolean,
    addInTail: boolean,
    addByIndex: boolean,
    deleteFromHead: boolean,
    deleteFromTail: boolean,
    deleteByIndex: boolean,
  },
  list: IQueueCircles[],
};

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
  next?: LListNode<T>| null;
}

export interface INodeDLList<T> {
  head: LListNode<T> | null;
  tail: LListNode<T> | null;
}