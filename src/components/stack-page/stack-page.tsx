import React, {useEffect, useMemo, useReducer} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {IStackPage} from "../../types/components";
import {Stack} from "../../utils/structures";
import {Circle} from "../ui/circle/circle";
import {initialState, stackAnimations} from "./utils";

export const StackPage: React.FC = () => {
  const stack = useMemo(() => new Stack<string>(), []);
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
    stackAnimations(stack, updateState, 'add');
  };

  const buttonDeleteHandler = async() => {
    stack.pop();
    stackAnimations(stack, updateState, 'delete');
  };
  const buttonClearHandler = () => {
    stack.clear();
    stackAnimations(stack, updateState, 'clear');
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
          {state.array && state.array.map(circle => <Circle state={circle.state} key={circle.key} letter={circle.number} head={circle.top ? 'top': ''}/>)}
        </ul>
      </div>
    </SolutionLayout>
  );
};
