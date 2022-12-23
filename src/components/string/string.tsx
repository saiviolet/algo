import React, {useReducer} from "react";
import { nanoid } from 'nanoid';
// компоненты
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
// ui
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
// ф-ии
import {swap, wait} from "../../utils/utils";
// типы
import {ElementStates} from "../../types/element-states";
import {ILetter, IStateString} from "../../types/components";
// стили
import styles from './string.module.css';

export const StringComponent: React.FC = () => {

  const initialState:IStateString = {
    buttonLoader: false,
    buttonDisabled: true,
    inputValue: '',
    string: null,
  };

  const [state, updateState] = useReducer<(state: IStateString, updates: any) => IStateString>(
    (state, updates) => ({ ...state, ...updates }),
    initialState
  );

  const getReverseString = async (letters: ILetter[]) => {
    updateState({ buttonLoader: true })
    let last;
    for (let i = 0; i < letters.length; i++) {
      last = (letters.length - 1) - i;
      if(i < last) {
        letters[i].state = ElementStates.Changing;
        letters[last].state = ElementStates.Changing;
        updateState({ string: letters });
        swap(letters, i, last);
        await wait(1000);
      }
      letters[i].state = ElementStates.Modified;
      letters[last].state = ElementStates.Modified;
      updateState({ string: letters });
    };
    updateState({ buttonLoader: false })
  };
  const inputHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    let input = evt.target as HTMLInputElement;
    input.value
      ? updateState({ buttonDisabled: false, inputValue: input.value })
      : updateState({ buttonDisabled: true, inputValue: input.value });
  };
  const buttonHandler = () => {
    const letters:ILetter[] = state.inputValue.split('').map(letter => {
      return {letter, key: nanoid(10), state: ElementStates.Default}
    });
    setTimeout(() => {
      updateState({ string: letters })
        getReverseString(letters);
      }, 500);
  };

  return (
    <SolutionLayout title="Строка" >
      <div className={styles.mainWrapper}>
        <div className={styles.wrapper}>
          <Input
            maxLength={11}
            extraClass={styles.input}
            onChange={inputHandler}
            type={"text"} isLimitText
          />
          <Button
            text={"Развернуть"}
            isLoader={state.buttonLoader}
            disabled={state.buttonDisabled}
            linkedList={"small"}
            onClick={buttonHandler}
          />
        </div>
        <ul className={styles.list}>
          {state.string &&
            state.string.map((letter) => <Circle letter={letter.letter} key={letter.key} state={letter.state}/>)
          }
        </ul>
      </div>
    </SolutionLayout>
  );
};
