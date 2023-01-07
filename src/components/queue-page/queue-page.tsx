import React, {useMemo, useReducer} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {IQueuePage} from "../../types/components";
import {Queue, Stack} from "../../utils/structures";
import {nanoid} from "nanoid";
import {ElementStates} from "../../types/element-states";
import {Circle} from "../ui/circle/circle";
import {circles, wait} from "../../utils/utils";

export const QueuePage: React.FC = () => {
  const queue = useMemo(() => new Queue<string>(), []);
  const queueLength = 6;
  const initialCircles = circles(queueLength);
  const initialState:IQueuePage = {
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
    circles: initialCircles,
  };

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
    const queueArr = queue.getArray();
    const queueTail = queue.getTail() - 1;
    const queueHead = queue.getHead();
    const queueArrLength = queueArr.length - 1;
    const queueSize = queue.getSize();
    console.log('queueTail '+queueTail);
    console.log('queueHead '+queueHead);
    console.log('queueSize '+queueSize);
    updateState({inputValue: '',
      circles: state.circles.map((circle, index) => {
        circle.letter = queueArr[index];
        circle.tail = '';
        circle.head = '';
        circle.state = ElementStates.Default;
        if(index === queueArrLength) {
          circle.state = ElementStates.Changing;
        };
        if(index === queueTail) circle.tail = 'tail';
        if(index === queueHead) circle.head = 'head';
        return circle;
        }),
      buttonBlocks: {...state.buttonBlocks, addBtn: false, deleteBtn: true, clearBtn: true},
      buttonLoaders: {...state.buttonLoaders, addBtn: true},
    });
    await wait(1000);
    updateState({inputValue: '',
      circles: state.circles.map((circle, index) => {
        circle.letter = queueArr[index];
        circle.tail = '';
        circle.head = '';
        circle.state = ElementStates.Default;
        if(index === queueTail) circle.tail = 'tail';
        if(index === queueHead) circle.head = 'head';
        return circle;
      }),
      buttonBlocks: {...state.buttonBlocks, addBtn: true, deleteBtn: false, clearBtn: false},
      buttonLoaders: {...state.buttonLoaders, addBtn: false},
    });
  };

  const buttonDeleteHandler = async() => {
    queue.dequeue();
    const queueArr = queue.getArray();
    const queueTail = queue.getTail() - 1;
    const queueHead = queue.getHead();
    const queueSize = queue.getSize();
    console.log('queueTail '+queueTail);
    console.log('queueHead '+queueHead);
    console.log('queueSize '+queueSize);
    const queueArrLength = queueArr.length - 1;
      updateState({inputValue: '',
        circles: state.circles.map((circle, index) => {
          circle.letter = queueArr[index];
          circle.tail = '';
          circle.head = '';
          circle.state = ElementStates.Default;
          if(index === queueHead) {
            circle.state = ElementStates.Changing;
            circle.head = 'head';
          };
          if(index === queueTail) circle.tail = 'tail';
          return circle;
        }),
        buttonBlocks: {...state.buttonBlocks, addBtn: true, deleteBtn: false, clearBtn: true},
        buttonLoaders: {...state.buttonLoaders, deleteBtn: true},
      });
      await wait(1000);
      updateState({inputValue: '',
        circles: state.circles.map((circle, index) => {
          circle.letter = queueArr[index];
          circle.tail = '';
          circle.head = '';
          circle.state = ElementStates.Default;
          if(index === queueTail) circle.tail = 'tail';
          if(index === queueHead) circle.head = 'head';
          return circle;
        }),
        buttonBlocks: {...state.buttonBlocks, addBtn: false, deleteBtn: false, clearBtn: false},
        buttonLoaders: {...state.buttonLoaders, deleteBtn: false},
      });
  };

  const buttonClearHandler = () => {
    queue.clear();
    const queueArr = queue.getArray();
    updateState({inputValue: '',
      circles: initialCircles,
    });
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
