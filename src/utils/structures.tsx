import {IDLListNode, ILinkedList, INode, INodeDLList, IQueue, IStack, TData} from "../types/components";

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

};

export class DLListNode<T> implements INode<T>{
  constructor(
    public data: T,
    public next: DLListNode<T> | null = null,
    public prev: DLListNode<T> | null = null,
){}
}

export class DLList<T> implements INodeDLList<T> {
  public head: DLListNode<T> | null = null;
  public tail: DLListNode<T> | null = null;
  // добавление нового значения в начало списка

  addInHead(data: T): DLList<T> {
    // новый узел, который станет head, а текущий head станет next
    const node = new DLListNode<T>(data, this.head);
    // если уже есть head (текущий head перестает быть первым), в нем ссылку на prev меняем на node
    if(this.head) this.head.prev = node;
    // переназначаем head
    this.head = node;
    // если это первый эл-т и нет tail, то назначаем node
    if(!this.tail) this.tail = node;
    return this;
  }
}
