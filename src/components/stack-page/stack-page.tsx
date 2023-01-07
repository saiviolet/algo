import React, {useEffect, useMemo, useReducer} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {IStackPage} from "../../types/components";
import {Stack} from "../../utils/structures";
import {nanoid} from "nanoid";
import {ElementStates} from "../../types/element-states";
import {Circle} from "../ui/circle/circle";
import {wait} from "../../utils/utils";

export const StackPage: React.FC = () => {
  const stack = useMemo(() => new Stack<string>(), []);
  const initialState:IStackPage = {
    inputValue: '',
    buttonLoaders: {
      addBtn: false,
      deleteBtn: false,
      clearBtn: false,
    },
    buttonBlocks: {
      addBtn: true,
      deleteBtn: false,
      clearBtn: false,
    },
    array: [],
  };

  const [state, updateState] = useReducer<(state: IStackPage, updates: any) => IStackPage>(
    (state, updates) => ({ ...state, ...updates }),
    initialState
  );

  const inputHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    let input = evt.target as HTMLInputElement;
    input.value
      ? updateState({ buttonBlocks: {...state.buttonBlocks, addBtn: false}, inputValue: input.value})
      : updateState({ buttonBlocks: {...state.buttonBlocks, addBtn: true}, inputValue: input.value})
  };

  const buttonAddHandler = async () => {
    stack.push(state.inputValue);
    const array = stack.getArray();
    const arrayLength = array.length-1;
    updateState({inputValue: '', array: array.map((number, index) => {
        if(index === arrayLength) return {number, key: nanoid(10), state: ElementStates.Changing, top: true};
        return {number, key: nanoid(10), state: ElementStates.Default, top: false}
      })});
    await wait(500);
    updateState({inputValue: '', array: array.map((number, index) => {
        if(index === arrayLength) return {number, key: nanoid(10), state: ElementStates.Default, top: true};
        return {number, key: nanoid(10), state: ElementStates.Default, top: false}
      })});
  };

  const buttonDeleteHandler = async() => {
    stack.pop();
    const array = stack.getArray();
    const arrayLength = array.length-1;
    updateState({inputValue: '', array: array.map((number, index) => {
        if(index === arrayLength) return {number, key: nanoid(10), state: ElementStates.Changing, top: true};
        return {number, key: nanoid(10), state: ElementStates.Default}
      })});
    await wait(500);
    updateState({inputValue: '', array: array.map((number, index) => {
        if(index === arrayLength) return {number, key: nanoid(10), state: ElementStates.Default, top: true};
        return {number, key: nanoid(10), state: ElementStates.Default, top: false}
      })});
  };

  const buttonClearHandler = () => {
    stack.clear();
    const array = stack.getArray();
    updateState({array});
  };
  return (
    <SolutionLayout title="Стек">
      <div className={styles.mainWrapper}>
        <div className={styles.panel}>
          <div className={styles.wrapper}>
            <Input
              maxLength={4}
              extraClass={styles.input}
              onChange={inputHandler}
              type={"text"} isLimitText
              value={state.inputValue}
            />
            <Button
              text={"Добавить"}
              isLoader={state.buttonLoaders.addBtn}
              disabled={state.buttonBlocks.addBtn}
              linkedList={"small"}
              onClick={buttonAddHandler}
            />
            <Button
              text={"Удалить"}
              isLoader={state.buttonLoaders.deleteBtn}
              disabled={state.buttonBlocks.deleteBtn}
              linkedList={"small"}
              onClick={buttonDeleteHandler}
            />
          </div>
          <Button
            text={"Очистить"}
            isLoader={state.buttonLoaders.clearBtn}
            disabled={state.buttonBlocks.clearBtn}
            linkedList={"small"}
            onClick={buttonClearHandler}
          />
        </div>
        <ul className={styles.circles}>
          {state.array && state.array.map(circle => <Circle state={circle.state} key={circle.key} letter={circle.number} />)}
        </ul>
      </div>
    </SolutionLayout>
  );
};
