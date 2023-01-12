import React, {ReactElement, useEffect, useMemo, useReducer} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {IListPage} from "../../types/components";
import {LinkedList, LListNode} from "../../utils/structures";
import {wait} from "../../utils/utils";
import {Circle} from "../ui/circle/circle";
import {nanoid} from "nanoid";
import {ElementStates} from "../../types/element-states";
import {ArrowIcon} from "../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {
  const linkedList = useMemo(() => new LinkedList<string>(), []);
  const initialState:IListPage = {
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
      deleteByIndex: false,
    },
    list: [],
  };

  const [state, updateState] = useReducer<(state: IListPage, updates: any) => IListPage>(
    (state, updates) => ({ ...state, ...updates }),
    initialState
  );

  useEffect(() => {
    const hardcode = ['щука', 'в', 'реке', 'жила'];
    hardcode.forEach(item => {
      linkedList.addInTail(item);
    });
    const list = linkedList.toArray();
    const insertArray = list!.map((item, index) => {
      return {
        key: nanoid(10),
        state: ElementStates.Default,
        letter: item.data,
        head: index === 0 ? 'head' : undefined,
        tail: index === list!.length - 1 ? 'tail' : undefined,
        index: index,
      }
    });
    updateState({list: insertArray});
  },[]);

  const inputValueHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    let input = evt.target as HTMLInputElement;
    input.value
      ? updateState({ buttonBlocks: {...state.buttonBlocks, addInHead: false, addInTail: false}, inputValue: input.value })
      : updateState({ buttonBlocks: {...state.buttonBlocks, addInHead: true, addInTail: true}, inputValue: input.value });
  };

  const inputIndexHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    let input = evt.target as HTMLInputElement;
    (input.value && state.inputValue)
      ? updateState({ buttonBlocks: {...state.buttonBlocks, addByIndex: false, deleteByIndex: false}, inputIndex: input.value })
      : updateState({ buttonBlocks: {...state.buttonBlocks, addByIndex: true, deleteByIndex: true}, inputIndex: input.value });
  };

  const buttonAddToHead = async() => {
    if(state.inputValue) linkedList.addInHead(state.inputValue);
    const list = linkedList.toArray();
    let littleCircle: ReactElement;
    if (list) littleCircle = <Circle
      letter={list[0].data}
      key={nanoid(10)}
      state = {ElementStates.Changing}
      isSmall={true}
    />
    const beforeInsertArray = state.list.map((item, index) => {
      return {
        key: nanoid(10),
        state: ElementStates.Default,
        letter: item.letter,
        head: index === 0 ? littleCircle : '',
        tail: undefined,
        index: index,
      }
    });
    const insertArray = list!.map((item, index) => {
      return {
        key: nanoid(10),
        state: index === 0? ElementStates.Modified : ElementStates.Default,
        letter: item.data,
        head: index === 0 ? 'head' : undefined,
        tail: undefined,
        index: index,
      }
    });
    updateState({
      buttonLoaders: {...state.buttonLoaders, addInHead: true},
      buttonBlocks: {...state.buttonBlocks, addInTail: true, addByIndex: true, deleteFromHead: true, deleteFromTail: true, deleteByIndex: true},
      inputValue: '',
      list: beforeInsertArray,
    });
    await wait(1000);
    updateState({list: insertArray});
    insertArray[0].state = ElementStates.Default;
    updateState({list: insertArray});
    await wait(1000);
    updateState({
      buttonLoaders: {...state.buttonLoaders, addInHead: false},
      buttonBlocks: {...state.buttonBlocks, addInTail: false, addByIndex: false, deleteFromHead: false, deleteFromTail: false, deleteByIndex: false},
      list: insertArray,
    });
  };

  const buttonAddToTail = async() => {
    if(state.inputValue) linkedList.addInTail(state.inputValue);
    //
    const list = linkedList.toArray();
    let littleCircle: ReactElement;
    if (list) littleCircle = <Circle
      letter={list[list.length-1].data}
      key={nanoid(10)}
      state = {ElementStates.Changing}
      isSmall={true}
    />
    const beforeInsertArray = state.list.map((item, index) => {
      return {
        key: nanoid(10),
        state: ElementStates.Default,
        letter: item.letter,
        head: index === list!.length-2 ? littleCircle : '',
        tail: undefined,
        index: index,
      }
    });
    const insertArray = list!.map((item, index) => {
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
      buttonLoaders: {...state.buttonLoaders, addInTail: true},
      buttonBlocks: {...state.buttonBlocks, addInHead: true, addByIndex: true, deleteFromHead: true, deleteFromTail: true, deleteByIndex: true},
      inputValue: '',
      list: beforeInsertArray,
    });
    await wait(1000);
    updateState({list: insertArray});
    await wait(1000);
    updateState({
      buttonLoaders: {...state.buttonLoaders, addInTail: false},
      buttonBlocks: {...state.buttonBlocks, addInHead: false, addByIndex: false, deleteFromHead: false, deleteFromTail: false, deleteByIndex: false},
      list: afterInsertArray,
    });
  };

  const buttonAddByIndex = async() => {
    let indexInsert: number;
    if(state.inputValue && state.inputIndex) {
      indexInsert = Number(state.inputIndex);
      linkedList.addByIndex(state.inputValue, indexInsert);
    }
    const list:LListNode<string>[] | null = linkedList.toArray();
    const oldList = state.list;
    let littleCircle: ReactElement;
    if (list) littleCircle = <Circle
      letter={list[indexInsert!].data}
      key={nanoid(10)}
      state = {ElementStates.Changing}
      isSmall={true}
    />;
    const beforeInsertArray = state.list.map((item, index) => {
      return {
        key: nanoid(10),
        state: ElementStates.Default,
        letter: item.letter,
        head: index === 0 ? littleCircle : '',
        tail: index === state.list.length-1 ? 'tail' : undefined,
        index: index,
      }
    });
    updateState({
      buttonLoaders: {...state.buttonLoaders, addByIndex: true},
      buttonBlocks: {...state.buttonBlocks, addInHead: true, addInTail: true, deleteFromHead: true, deleteFromTail: true, deleteByIndex: true},
      inputValue: '',
      list: beforeInsertArray,
    });
    // await wait(1000);
    let animationLength = 0;
    let insertArray: any[] = [];
    while(animationLength < indexInsert!) {
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
    const insertArrWithNewValue = list!.map((item, index) => {
      return {
        key: nanoid(10),
        state: index === indexInsert ? ElementStates.Modified : ElementStates.Default,
        letter: item.data,
        head: index === 0 ? 'head': '',
        tail: index === list!.length-1 ? 'tail' : undefined,
        index: index,
      }
    });
    updateState({list: insertArrWithNewValue});
    await wait(1000);
    insertArrWithNewValue[indexInsert!].state = ElementStates.Default;
    updateState({
      buttonLoaders: {...state.buttonLoaders, addByIndex: false},
      buttonBlocks: {...state.buttonBlocks, addInHead: false, addInTail: false, deleteFromHead: false, deleteFromTail: false, deleteByIndex: false},
      list: insertArrWithNewValue,
    });
  };

  const buttonDeleteFromHead = async() => {
    if(linkedList.toArray()!.length <= 0) throw new Error('Cписок пуст');
    linkedList.deleteFromHead();
    updateState({
      buttonLoaders: {...state.buttonLoaders, deleteFromHead: true},
      buttonBlocks: {...state.buttonBlocks, addInHead: true, addInTail: true, addByIndex: true, deleteFromTail: true, deleteByIndex: true},
      inputValue: ''});
    await wait(1000);
    updateState({
      buttonLoaders: {...state.buttonLoaders, deleteFromHead: false},
      buttonBlocks: {...state.buttonBlocks, addInHead: false, addInTail: false, addByIndex: false, deleteFromTail: false, deleteByIndex: false}
    });
    console.log(linkedList.toArray());
  };

  const buttonDeleteFromTail = async() => {
    if(linkedList.toArray()!.length <= 0) throw new Error('Cписок пуст');
    linkedList.deleteFromTail();
    updateState({
      buttonLoaders: {...state.buttonLoaders, deleteFromTail: true},
      buttonBlocks: {...state.buttonBlocks, addInHead: true, addInTail: true, addByIndex: true, deleteFromHead: true, deleteByIndex: true},
      inputValue: ''});
    await wait(1000);
    updateState({
      buttonLoaders: {...state.buttonLoaders, deleteFromTail: false},
      buttonBlocks: {...state.buttonBlocks, addInHead: false, addInTail: false, addByIndex: false, deleteFromHead: false, deleteByIndex: false}
    });
    console.log(linkedList.toArray());
  };

  const buttonDeleteByIndex = async() => {
    if(!state.inputIndex) throw new Error('Не введен индекс для удаления или список пуст')
    else {
      if(state.inputIndex) linkedList.deleteByIndex(Number(state.inputIndex));
      updateState({
        buttonLoaders: {...state.buttonLoaders, deleteByIndex: true},
        buttonBlocks: {...state.buttonBlocks, addInHead: true, addInTail: true, addByIndex: true, deleteFromHead: true, deleteFromTail: true},
        inputValue: ''});
      await wait(1000);
      updateState({
        buttonLoaders: {...state.buttonLoaders, deleteByIndex: false},
        buttonBlocks: {...state.buttonBlocks, addInHead: false, addInTail: false, addByIndex: false, deleteFromHead: false, deleteFromTail: false}
      });
      console.log(linkedList.toArray());
    }
  };
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.mainWrapper}>
        <div className={styles.panel}>
          <Input
            placeholder={"Введите значение"}
            maxLength={4}
            onChange={inputValueHandler}
            type={"text"} isLimitText
            value={state.inputValue}
          />
          <Button
            extraClass={styles.buttonAddHead}
            text={"Добавить в head"}
            isLoader={state.buttonLoaders.addInHead}
            disabled={state.buttonBlocks.addInHead}
            linkedList={"small"}
            onClick={buttonAddToHead}
          />
          <Button
            text={"Добавить в tail"}
            isLoader={state.buttonLoaders.addInTail}
            disabled={state.buttonBlocks.addInTail}
            linkedList={"small"}
            onClick={buttonAddToTail}
          />
          <Button
            text={"Удалить из head"}
            isLoader={state.buttonLoaders.deleteFromHead}
            disabled={state.buttonBlocks.deleteFromHead}
            linkedList={"small"}
            onClick={buttonDeleteFromHead}
          />
          <Button
            text={"Удалить из tail"}
            isLoader={state.buttonLoaders.deleteFromTail}
            disabled={state.buttonBlocks.deleteFromTail}
            linkedList={"small"}
            onClick={buttonDeleteFromTail}
          />
          <Input
            placeholder={"Введите индекс"}
            maxLength={1}
            onChange={inputIndexHandler}
            type={"text"} isLimitText
            value={state.inputIndex}
          />
          <Button
            text={"Добавить по индексу"}
            isLoader={state.buttonLoaders.addByIndex}
            disabled={state.buttonBlocks.addByIndex}
            onClick={buttonAddByIndex}
            extraClass={styles.buttonAddByIndex}
          />
          <Button
            text={"Удалить по индексу"}
            isLoader={state.buttonLoaders.deleteByIndex}
            disabled={state.buttonBlocks.deleteByIndex}
            extraClass={styles.buttonDeleteByIndex}
            onClick={buttonDeleteByIndex}
          />
        </div>
        <ul className={styles.list}>
          {state.list && state.list.map((circle, index) => <React.Fragment key={circle.key}><Circle
            letter={circle.letter}
            key={circle.key}
            state = {circle.state}
            head={circle.head}
            tail={circle.tail}
            index={circle.index}
          />
            {index <= state.list.length-2 && <ArrowIcon />}
            </React.Fragment>
          ) }
        </ul>
      </div>
    </SolutionLayout>
  );
};
