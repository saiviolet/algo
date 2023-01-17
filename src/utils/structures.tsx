import {INode, INodeDLList} from "../types/components";


export class LListNode<T> implements INode<T>{
  constructor(
    public data: T,
    public next: LListNode<T> | null = null,
){}
}

export class LinkedList<T> implements INodeDLList<T> {
  public head: LListNode<T> | null = null;
  public tail: LListNode<T> | null = null;
  // добавление нового значения в начало списка
  addInHead(data: T): LinkedList<T> {
    // новый узел, передаем в него значение и текущий head (в качестве next для нового узла)
    const node = new LListNode<T>(data,this.head);
    // теперь хэд = новый узел
    this.head = node;
    // проверяем есть ли tail и если нет - назначаем новый узел в качества tail
    if(!this.tail) this.tail = node;
    return this;
  }
  // добавление нового значения в конец списка
  addInTail(data: T): LinkedList<T> {
    const node = new LListNode<T>(data);
    // если еще нет head или tail - делаем новый узел
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
      return this;
    }
    // для текущего tail указываем, что его next - новый узел
    this.tail.next = node;
    // переназначаем tail на новый узел
    this.tail = node;
    return this;
  }

  addByIndex(data: T, index: number): LinkedList<T> {
    // Если индекс 0 - добавляем в начало списка
    if (index === 0) {
      this.addInHead(data);
      return this;
    }
    // узел для вставки
    const insertNode = new LListNode<T>(data);

    // Итерирование до нужного индекса
    let node = this.head;
    for (let i = 0; i < index - 1; i++) {
      node = node!.next;
    }

    // указываем next для вставляемого узла
    insertNode.next = node!.next;

    // указывае next на новый узед в текущем
    node!.next = insertNode;
    return this;
  }

  deleteFromHead(): LinkedList<T> | null {
    // если head нет, значит и удалять нечего
    if(!this.head) return null;
    // const deletedHead = this.head;
    // если у head есть next, то он станет новым head
    if(this.head.next) this.head = this.head.next
    else {
      // если у head нет next, то удаляем последний узел
      this.head = null;
      this.tail = null;
    }
    return this;
  }

  deleteFromTail(): LinkedList<T> | null {
    // если tail нет, значит и удалять нечего
    if(!this.tail) return null;
    // const deletedTail = this.tail;
    // если head = next, значит в списке всего 1 узел
    if(this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return this;
    }
    let node = this.head;
    // проходимся по всему списку
    while(node!.next !== this.tail) {
      // итерирование до предпоследнего узла в списке
      node = node!.next;
    }
    // next должен указывать на null
    node!.next = null;
    // а tail указывать на текущий узел
    this.tail = node;
    return this;
  }

  deleteByIndex(index: number):LinkedList<T> | null {
    if (index === 0) {
      this.deleteFromHead();
      return this;
    }
    let node = this.head;
    for (let i = 0; i < index - 1; i++) {
      node = node!.next;
    }
    if (node!.next !== null) {
      node!.next = node!.next.next;
    }
    node = node!.next;
    return this
  }

  toArray(): LListNode<T>[] | null {
    const array = [];
    let head = this.head;
    while(head) {
      array.push(head);
      head = head.next;
    }
    return array;
  }

  // findValueByIndex(data: T): LListNode<T> | null {
  //   // если нет head - значит список пуст
  //   if (!this.head) {
  //     return null;
  //   }
  //
  //   return this;
  // }


}
