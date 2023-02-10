import {IStack, IStackPage, TStackAnimation} from "../../types/components";
import {nanoid} from "nanoid";
import {ElementStates} from "../../types/element-states";
import {wait} from "../../utils/utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push(item: T): void{
    this.container.push(item);
  };
  pop(): void{
    this.container.pop();
  };
  clear(): void {
    this.container = [];
  };

  getArray(): T[] {
    return this.container;
  };

};

export const initialState:IStackPage = {
  inputValue: '',
  buttonLoaders: {
    addBtn: false,
    deleteBtn: false,
    clearBtn: false,
  },
  buttonBlocks: {
    addBtn: true,
    deleteBtn: true,
    clearBtn: true,
  },
  array: [],
};

export const stackAnimations:TStackAnimation = async (stack, updateState, type) => {
  const array = stack.getArray();
  const arrayLength = array.length-1;
  switch (type) {
  case 'add':
    updateState({inputValue: '', array: array.map((number, index) => {
        if(index === arrayLength) return {number, key: nanoid(10), state: ElementStates.Changing, top: true};
        return {number, key: nanoid(10), state: ElementStates.Default, top: false}
      })});
    await wait(SHORT_DELAY_IN_MS);
    updateState({inputValue: '', array: array.map((number, index) => {
        if(index === arrayLength) return {number, key: nanoid(10), state: ElementStates.Default, top: true};
        return {number, key: nanoid(10), state: ElementStates.Default, top: false}
      })});
    break;
  case 'delete':
    updateState({inputValue: '', array: array.map((number, index) => {
        if(index === arrayLength) return {number, key: nanoid(10), state: ElementStates.Changing, top: true};
        return {number, key: nanoid(10), state: ElementStates.Default}
      })});
    await wait(SHORT_DELAY_IN_MS);
    updateState({inputValue: '', array: array.map((number, index) => {
        if(index === arrayLength) return {number, key: nanoid(10), state: ElementStates.Default, top: true};
        return {number, key: nanoid(10), state: ElementStates.Default, top: false}
      })});
    break;
  case 'clear':
    updateState({ array });
    break;
  default:
    alert( "LOL" );
  }
}