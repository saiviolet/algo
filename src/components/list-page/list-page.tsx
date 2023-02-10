import React, {Fragment, useEffect, useMemo, useReducer} from "react";
// ui
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";
// компоненты
import {IListPage} from "../../types/components";
// стили
import styles from "./list-page.module.css";
// вспомогательные
import {nanoid} from "nanoid";
import {ElementStates} from "../../types/element-states";
import {initialState, LinkedList, listAnimations, testList} from "./utils";

export const ListPage: React.FC = () => {
  const linkedList = useMemo(() => new LinkedList<string>(), []);

  const [state, updateState] = useReducer<(state: IListPage, updates: any) => IListPage>(
    (state, updates) => ({ ...state, ...updates }),
    initialState
  );

  useEffect(() => {
    testList.forEach(item => {
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
    (input.value && state.inputValue)
      ? updateState({ buttonBlocks: {...state.buttonBlocks, addByIndex: false }, inputValue: input.value })
      : updateState({ buttonBlocks: {...state.buttonBlocks, addByIndex: true }, inputValue: input.value });
    (input.value)
      ? updateState({ buttonBlocks: {...state.buttonBlocks, addInHead: false, addInTail: false}, inputValue: input.value })
      : updateState({ buttonBlocks: {...state.buttonBlocks, addInHead: true, addInTail: true}, inputValue: input.value });

  };

  const inputIndexHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    let input = evt.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, "");
    const lengthList = linkedList.toArray()?.length;
    const numberValue = Number(value);
    console.log(lengthList);
    console.log(input.value);
    if( (numberValue < 0) || (numberValue > lengthList! -1 ) ) {
      updateState({ buttonBlocks: {...state.buttonBlocks, addByIndex: true, deleteByIndex: true} })
    }
    else {
      (value && state.inputValue)
        ? updateState({ buttonBlocks: {...state.buttonBlocks, addByIndex: false, deleteByIndex: false}, inputIndex: value })
        : updateState({ buttonBlocks: {...state.buttonBlocks, addByIndex: true, deleteByIndex: true}, inputIndex: value });
      (value)
        ? updateState({ buttonBlocks: {...state.buttonBlocks, addByIndex: false, deleteByIndex: false}, inputIndex: value })
        : updateState({ buttonBlocks: {...state.buttonBlocks, addByIndex: true, deleteByIndex: true}, inputIndex: value });
    }
  };

  const buttonAddToHead = async() => {
    if(state.inputValue) linkedList.addInHead(state.inputValue);
    listAnimations(linkedList, updateState, 'addToHead', state);
  };

  const buttonAddToTail = async() => {
    if(state.inputValue) linkedList.addInTail(state.inputValue);
    listAnimations(linkedList, updateState, 'addToTail', state);
  };

  const buttonAddByIndex = async() => {
    // TODO переделать потом как в удалении по индексу
    let indexInsert: number;
    if(state.inputValue && state.inputIndex) {
      indexInsert = Number(state.inputIndex);
      if(indexInsert > state.list.length) throw new Error('Индекс для ввода больше длины списка');
      linkedList.addByIndex(state.inputValue, indexInsert);
      listAnimations(linkedList, updateState, 'addByIndex', state, indexInsert);
    }
    else throw new Error('Проверьте все ли данные были внесены');
  };
  const buttonDeleteFromHead = async() => {
    if(linkedList.toArray()!.length <= 0) throw new Error('Cписок пуст');
    linkedList.deleteFromHead();
    listAnimations(linkedList, updateState, 'deleteFromHead', state);
  };

  const buttonDeleteFromTail = async() => {
    if(linkedList.toArray()!.length <= 0) throw new Error('Cписок пуст');
    linkedList.deleteFromTail();
    listAnimations(linkedList, updateState, 'deleteFromTail', state);
  };

  const buttonDeleteByIndex = async() => {
    if(!state.inputIndex) throw new Error('Не введен индекс для удаления или список пуст');
    let indexDelete: number = Number(state.inputIndex);
    if(indexDelete > state.list.length) throw new Error('Индекс для ввода больше длины списка');
    listAnimations(linkedList, updateState, 'deleteByIndex', state, indexDelete);
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
            testData={'inputValue'}
          />
          <Button
            extraClass={styles.buttonAddHead}
            text={"Добавить в head"}
            isLoader={state.buttonLoaders.addInHead}
            disabled={state.buttonBlocks.addInHead}
            linkedList={"small"}
            onClick={buttonAddToHead}
            testData={'buttonAddToHead'}
          />
          <Button
            text={"Добавить в tail"}
            isLoader={state.buttonLoaders.addInTail}
            disabled={state.buttonBlocks.addInTail}
            linkedList={"small"}
            onClick={buttonAddToTail}
            testData={'buttonAddToTail'}
          />
          <Button
            text={"Удалить из head"}
            isLoader={state.buttonLoaders.deleteFromHead}
            disabled={state.buttonBlocks.deleteFromHead}
            linkedList={"small"}
            onClick={buttonDeleteFromHead}
            testData={'buttonDeleteFromHead'}
          />
          <Button
            text={"Удалить из tail"}
            isLoader={state.buttonLoaders.deleteFromTail}
            disabled={state.buttonBlocks.deleteFromTail}
            linkedList={"small"}
            onClick={buttonDeleteFromTail}
            testData={'buttonDeleteFromTail'}
          />
          <Input
            placeholder={"Введите индекс"}
            max={1}
            onChange={inputIndexHandler}
            type={"number"}
            isLimitText
            value={state.inputIndex}
            testData={'inputIndex'}
          />
          <Button
            text={"Добавить по индексу"}
            isLoader={state.buttonLoaders.addByIndex}
            disabled={state.buttonBlocks.addByIndex}
            onClick={buttonAddByIndex}
            extraClass={styles.buttonAddByIndex}
            testData={'buttonAddByIndex'}
          />
          <Button
            text={"Удалить по индексу"}
            isLoader={state.buttonLoaders.deleteByIndex}
            disabled={state.buttonBlocks.deleteByIndex}
            extraClass={styles.buttonDeleteByIndex}
            onClick={buttonDeleteByIndex}
            testData={'buttonDeleteByIndex'}
          />
        </div>
        <ul className={styles.list}>
          { state.list && state.list.map((circle, index) => <Fragment key={circle.key}><Circle
            letter={circle.letter}
            key={circle.key}
            state = {circle.state}
            head={circle.head}
            tail={circle.tail}
            index={circle.index}
          />
            {index <= state.list.length-2 && <ArrowIcon />}
            </Fragment>
          )}
        </ul>
      </div>
    </SolutionLayout>
  );
};
