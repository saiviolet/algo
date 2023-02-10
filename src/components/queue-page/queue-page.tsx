import React, {useMemo, useReducer} from "react";
// ui
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
// компоненты
import {IQueuePage} from "../../types/components";
// стили
import styles from "./queue-page.module.css";
// вспомогательные
import {Queue, initialState, queueAnimation} from "./utils";

export const QueuePage: React.FC = () => {
  const queue = useMemo(() => new Queue<string>(), []);

  const [state, updateState] = useReducer<(state: IQueuePage, updates: any) => IQueuePage>(
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
    queue.enqueue(state.inputValue);
    queueAnimation(queue, updateState, 'add', state);
  };

  const buttonDeleteHandler = async() => {
    queue.dequeue();
    queueAnimation(queue, updateState, 'delete', state);
  };
  const buttonClearHandler = () => {
    queue.clear();
    queueAnimation(queue, updateState, 'clear');
  };
  return (
    <SolutionLayout title="Очередь">
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
              testData={'buttonAdd'}
            />
            <Button
              text={"Удалить"}
              isLoader={state.buttonLoaders.deleteBtn}
              disabled={state.buttonBlocks.deleteBtn}
              linkedList={"small"}
              onClick={buttonDeleteHandler}
              testData={'buttonDelete'}
            />
          </div>
          <Button
            text={"Очистить"}
            isLoader={state.buttonLoaders.clearBtn}
            disabled={state.buttonBlocks.clearBtn}
            linkedList={"small"}
            onClick={buttonClearHandler}
            testData={'buttonClear'}
          />
        </div>
        <ul className={styles.circles}>
          {state.circles.map(circle => <Circle
            state={circle.state}
            key={circle.key}
            index={circle.index}
            head={circle.head}
            tail={queue.getTail() > queue.getHead() ? circle.tail: ''}
            letter={circle.letter}/>
          )}
        </ul>
      </div>
    </SolutionLayout>
  );
};
