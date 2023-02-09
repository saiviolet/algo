import {IArrayInLIst, IListPage, INode, INodeDLList, IQueueCircles, TListAnimation} from "../../types/components";
import React, {ReactElement} from "react";
import {Circle} from "../ui/circle/circle";
import {nanoid} from "nanoid";
import {ElementStates} from "../../types/element-states";
import {wait} from "../../utils/utils";


export const testList = ['щука', 'в', 'реке', 'жила'];
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
    const node = new LListNode<T>(data, this.head);
    // теперь хэд = новый узел
    this.head = node;
    // проверяем есть ли tail и если нет - назначаем новый узел в качества tail
    if (!this.tail) this.tail = node;
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
    if (!this.head) return null;
    // const deletedHead = this.head;
    // если у head есть next, то он станет новым head
    if (this.head.next) this.head = this.head.next
    else {
      // если у head нет next, то удаляем последний узел
      this.head = null;
      this.tail = null;
    }
    return this;
  }

  deleteFromTail(): LinkedList<T> | null {
    // если tail нет, значит и удалять нечего
    if (!this.tail) return null;
    // const deletedTail = this.tail;
    // если head = next, значит в списке всего 1 узел
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return this;
    }
    let node = this.head;
    // проходимся по всему списку
    while (node!.next !== this.tail) {
      // итерирование до предпоследнего узла в списке
      node = node!.next;
    }
    // next должен указывать на null
    node!.next = null;
    // а tail указывать на текущий узел
    this.tail = node;
    return this;
  }

  deleteByIndex(index: number): LinkedList<T> | null {
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
    while (head) {
      array.push(head);
      head = head.next;
    }
    return array;
  }
}
export const initialState:IListPage = {
  inputValue: '',
  inputIndex: '',
  buttonLoaders: {
    addInHead: false,
    addInTail: false,
    addByIndex: false,
    deleteFromHead: false,
    deleteFromTail: false,
    deleteByIndex: false,
  },
  buttonBlocks: {
    addInHead: true,
    addInTail: true,
    addByIndex: true,
    deleteFromHead: false,
    deleteFromTail: false,
    deleteByIndex: true,
  },
  list: [],
};

export const listAnimations: TListAnimation = async(linkedList, updateState, type, state, index) => {
  let littleCircle: ReactElement;
  const list = linkedList.toArray();
  const oldList = state!.list;
  let beforeInsertArray;
  let insertArray;
  let animationLength = 0;
  switch (type) {
    case 'addToHead':
      littleCircle = <Circle
        letter={list![0].data}
        key={nanoid(10)}
        state = {ElementStates.Changing}
        isSmall={true}
      />
      beforeInsertArray = state!.list.map((item, index) => {
        return {
          key: nanoid(10),
          state: ElementStates.Default,
          letter: item.letter,
          head: index === 0 ? littleCircle : '',
          tail: index === state!.list.length-1 ? 'tail' : '',
          index: index,
        }
      });
      insertArray = list!.map((item, index) => {
        return {
          key: nanoid(10),
          state: index === 0? ElementStates.Modified : ElementStates.Default,
          letter: item.data,
          head: index === 0 ? 'head' : undefined,
          tail: index === list!.length-1 ? 'tail' : '',
          index: index,
        }
      });
      updateState({
        buttonLoaders: {...state!.buttonLoaders, addInHead: true},
        buttonBlocks: {...state!.buttonBlocks, addInTail: true, addByIndex: true, deleteFromHead: true, deleteFromTail: true, deleteByIndex: true},
        inputValue: '',
        list: beforeInsertArray,
      });
      await wait(1000);
      updateState({list: insertArray});
      await wait(1000);
      insertArray[0].state = ElementStates.Default;
      updateState({
        buttonLoaders: {...state!.buttonLoaders, addInHead: false},
        buttonBlocks: {...state!.buttonBlocks, deleteFromHead: false, deleteFromTail: false, deleteByIndex: true, addInTail: true, addInHead: true},
        list: insertArray,
      });
      break;
    case 'addToTail':
      littleCircle = <Circle
        letter={list![list!.length-1].data}
        key={nanoid(10)}
        state = {ElementStates.Changing}
        isSmall={true}
      />
      beforeInsertArray = state!.list.map((item, index) => {
        return {
          key: nanoid(10),
          state: ElementStates.Default,
          letter: item.letter,
          head: index === list!.length-2 ? littleCircle : index === 0 ? 'head' : '',
          tail: index === state!.list!.length-1 ? 'tail' : '',
          index: index,
        }
      });
      insertArray = list!.map((item, index) => {
        return {
          key: nanoid(10),
          state: index === list!.length-1 ? ElementStates.Modified : ElementStates.Default,
          letter: item.data,
          head: index === 0 ? 'head' : undefined,
          tail: index === list!.length-1 ? 'tail' : undefined,
          index: index,
        }
      });
      const afterInsertArray = JSON.parse(JSON.stringify(insertArray));
      afterInsertArray[list!.length-1].state = ElementStates.Default;
      //
      updateState({
        buttonLoaders: {...state!.buttonLoaders, addInTail: true},
        buttonBlocks: {...state!.buttonBlocks, addInHead: true, addByIndex: true, deleteFromHead: true, deleteFromTail: true, deleteByIndex: true},
        inputValue: '',
        list: beforeInsertArray,
      });
      await wait(1000);
      updateState({list: insertArray});
      await wait(1000);
      updateState({
        buttonLoaders: {...state!.buttonLoaders, addInTail: false},
        buttonBlocks: {...state!.buttonBlocks, addInHead: true, addInTail: true, addByIndex: true, deleteByIndex: true, deleteFromHead: false, deleteFromTail: false},
        list: afterInsertArray,
      });
      break;
    case 'addByIndex':
      littleCircle = <Circle
        letter={list![index!].data}
        key={nanoid(10)}
        state = {ElementStates.Changing}
        isSmall={true}
      />;
      beforeInsertArray = state!.list.map((item, index) => {
        return {
          key: nanoid(10),
          state: ElementStates.Default,
          letter: item.letter,
          head: index === 0 ? littleCircle : '',
          tail: index === state!.list.length-1 ? 'tail' : undefined,
          index: index,
        }
      });
      updateState({
        buttonLoaders: {...state!.buttonLoaders, addByIndex: true},
        buttonBlocks: {...state!.buttonBlocks, addInHead: true, addInTail: true, deleteFromHead: true, deleteFromTail: true, deleteByIndex: true},
        inputValue: '',
        inputIndex: '',
        list: beforeInsertArray,
      });
      while(animationLength < index!) {
        insertArray = oldList.map((item, index) => {
          return {
            key: nanoid(10),
            state: index <= animationLength-1 ? ElementStates.Changing : ElementStates.Default,
            letter: item.letter,
            head: index === animationLength ? littleCircle : index === 0 ? 'head': '',
            tail: index === oldList.length-1 ? 'tail' : undefined,
            index: index,
          }
        });
        updateState({list: insertArray});
        await wait(1000);
        animationLength++;
      }
      const insertArrWithNewValue = list!.map((item, ind) => {
        return {
          key: nanoid(10),
          state: ind === index ? ElementStates.Modified : ElementStates.Default,
          letter: item.data,
          head: ind === 0 ? 'head': '',
          tail: ind === list!.length-1 ? 'tail' : undefined,
          index: ind,
        }
      });
      updateState({list: insertArrWithNewValue});
      await wait(1000);
      insertArrWithNewValue[index!].state = ElementStates.Default;
      updateState({
        buttonLoaders: {...state!.buttonLoaders, addByIndex: false},
        buttonBlocks: {...state!.buttonBlocks, deleteFromHead: false, deleteFromTail: false, deleteByIndex: true, addByIndex: true, addInTail: true, addInHead: true},
        list: insertArrWithNewValue,
      });
      break;
    case 'deleteFromHead':
      littleCircle = <Circle
        letter={oldList[0].letter}
        key={nanoid(10)}
        state = {ElementStates.Changing}
        isSmall={true}
      />;
      beforeInsertArray = oldList.map((item, index) => {
        return {
          key: nanoid(10),
          state: ElementStates.Default,
          letter: index === 0 ? '' : item.letter,
          head: index === 0 ? 'head' : '',
          tail: index === oldList.length-1 ? 'tail' : index === 0 ? littleCircle : '',
          index: index,
        }
      });
      insertArray = list!.map((item, index) => {
        return {
          key: nanoid(10),
          state: ElementStates.Default,
          letter: item.data,
          head: index === 0 ? 'head' : '',
          tail: index === list!.length-1 ? 'tail' : undefined,
          index: index,
        }
      });
      updateState({
        buttonLoaders: {...state!.buttonLoaders, deleteFromHead: true},
        buttonBlocks: {...state!.buttonBlocks, addInHead: true, addInTail: true, addByIndex: true, deleteFromTail: true, deleteByIndex: true},
        inputValue: '',
        list: beforeInsertArray,
      });
      await wait(1000);
      updateState({
        buttonLoaders: {...state!.buttonLoaders, deleteFromHead: false},
        buttonBlocks: {...state!.buttonBlocks, deleteFromTail: false},
        list: insertArray,
      });
      break;
    case 'deleteFromTail':
      littleCircle = <Circle
        letter={oldList[oldList.length-1].letter}
        key={nanoid(10)}
        state = {ElementStates.Changing}
        isSmall={true}
      />;
      beforeInsertArray = oldList.map((item, index) => {
        return {
          key: nanoid(10),
          state: ElementStates.Default,
          letter: index === oldList.length-1 ? '' : item.letter,
          head: index === 0 ? 'head' : '',
          tail: index === oldList.length-1 ? littleCircle : '',
          index: index,
        }
      });
      insertArray = list!.map((item, index) => {
        return {
          key: nanoid(10),
          state: ElementStates.Default,
          letter: item.data,
          head: index === 0 ? 'head' : '',
          tail: index === list!.length-1 ? 'tail' : undefined,
          index: index,
        }
      });
      updateState({
        buttonLoaders: {...state!.buttonLoaders, deleteFromTail: true},
        buttonBlocks: {...state!.buttonBlocks, addInHead: true, addInTail: true, addByIndex: true, deleteFromHead: true, deleteByIndex: true},
        inputValue: '',
        list: beforeInsertArray,
      });
      await wait(1000);
      updateState({
        buttonLoaders: {...state!.buttonLoaders, deleteFromTail: false},
        buttonBlocks: {...state!.buttonBlocks, deleteFromHead: false},
        list: insertArray,
      });
      break;
    case 'deleteByIndex':
      updateState({
        buttonLoaders: {...state!.buttonLoaders, deleteByIndex: true},
        buttonBlocks: {...state!.buttonBlocks, addInHead: true, addInTail: true, addByIndex: true, deleteFromHead: true, deleteFromTail: true},
        inputIndex: '',
        inputValue: '',
      });
      littleCircle = <Circle
        letter={list![index!].data}
        key={nanoid(10)}
        state = {ElementStates.Changing}
        isSmall={true}
      />;
      let listArray: IQueueCircles[] = [];
      while(animationLength <= index!) {
        listArray = list!.map((item, index) => {
          return {
            key: nanoid(10),
            state: index <= animationLength ? ElementStates.Changing : ElementStates.Default,
            letter: item.data,
            head: index === 0 ? 'head' : '',
            tail: index === list!.length-1 ? 'tail' : '',
            index: index,
          }
        });
        updateState({list: listArray});
        await wait(1000);
        animationLength++;
      }
      if(state!.inputIndex) linkedList.deleteByIndex(Number(state!.inputIndex));
      if(listArray) {
        listArray[index!] = {...listArray[index!],
          state: ElementStates.Changing,
          letter: '',
          head: index === 0 ? 'head' : '',
          tail: littleCircle,
        }
        updateState({list: listArray});
        await wait(1000);
        listArray.splice(index!, 1);
        listArray.forEach((item, index) => {
          item.state = ElementStates.Default;
          item.index = index;
        });
        updateState({
          buttonLoaders: {...state!.buttonLoaders, deleteByIndex: false},
          buttonBlocks: {...state!.buttonBlocks, deleteFromHead: false, deleteFromTail: false, deleteByIndex: true, addByIndex: true, addInHead: true, addInTail:true},
          list: listArray
        });
      }
      break;
    default: throw new Error('Указан несуществующий тип');

  }
}