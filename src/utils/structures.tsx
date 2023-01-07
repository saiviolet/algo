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
  private size = -1;
  enqueue = (item: T): void => {
    this.container[this.tail++] = item;
    this.size++;
    if(this.size > 6 || this.head >=6) {
      throw new Error('Мест в очереди больше нет');
    }
  };

  dequeue = (): void  => {
    if(this.size < 0) {
      throw new Error('Удалять нечего ');
    }
    this.size--;
    // this.container.shift();
    if (this.tail === this.head) this.tail = 0;
    delete this.container[this.head++];
    if(this.size < 0) {
      this.head = this.head-1;
      this.tail = this.tail-1;
    }
  };

  clear = (): void => {
    this.container = [];
  };

  getArray = () => this.container;
  getTail = () => this.tail;
  getHead = () => this.head;
  getSize = () => this.size;

}