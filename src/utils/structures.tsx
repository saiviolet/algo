import {IQueue, IStack} from "../types/components";

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

export class Queue<T> implements IQueue<T> {
  private container: T[] = [];
  private head = 0;
  private tail = 0;
  enqueue = (item: T): void => {
    this.container.push(item);
  };

  dequeue = (): void => {
    this.container.shift();
  };

  clear = (): void => {
    this.container = [];
  };

  getArray = () => this.container;
  getTail = () => this.tail;
  getHead = () => this.head;

}