import {IStack} from "../types/components";

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };
  pop = (): void => {
    this.container.pop();
  };
  clear = (): void => {
    this.container = [];
  };

  getArray = () => this.container;

};