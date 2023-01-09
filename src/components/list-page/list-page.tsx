import React, {useMemo, useReducer} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {IListPage} from "../../types/components";
import {Stack} from "../../utils/structures";

export const ListPage: React.FC = () => {
  const stack = useMemo(() => new Stack<string>(), []);

  const initialState:IListPage = {
    inputValue: undefined,
    inputIndex: undefined,
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

  const inputValueHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    let input = evt.target as HTMLInputElement;
    input.value
      ? updateState({ buttonBlocks: {...state.buttonBlocks, addInHead: false, addInTail: false}, inputValue: input.value})
      : updateState({ buttonBlocks: {...state.buttonBlocks, addInHead: true, addInTail: true}, inputValue: input.value})
  };

  const inputIndexHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    let input = evt.target as HTMLInputElement;
    (input.value && state.inputValue)
      ? updateState({ buttonBlocks: {...state.buttonBlocks, addByIndex: false, deleteByIndex: false}, inputIndex: input.value})
      : updateState({ buttonBlocks: {...state.buttonBlocks, addByIndex: true, deleteByIndex: true}, inputIndex: input.value})
  };

  const buttonAddToHead = () => {

  };

  const buttonAddToTail = () => {

  };

  const buttonAddByIndex = () => {

  };

  const buttonDeleteFromHead = () => {

  };

  const buttonDeleteFromTail = () => {

  };

  const buttonDeleteByIndex = () => {

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
        <ul className={styles.list}></ul>
      </div>
    </SolutionLayout>
  );
};
