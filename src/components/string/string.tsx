import React, {useReducer} from "react";
import { nanoid } from 'nanoid';
// компоненты
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
// ui
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
// ф-ии
import {wait} from "../../utils/utils";
// типы
import {ElementStates} from "../../types/element-states";
import {ILetter, IStateString} from "../../types/components";
// стили
import styles from './string.module.css';
import {getReverseString, initialState, swapLetters} from "./utils";

export const StringComponent: React.FC = () => {

  const [state, updateState] = useReducer<(state: IStateString, updates: any) => IStateString>(
    (state, updates) => ({ ...state, ...updates }),
    initialState
  );

  const getAnimations = async (letters: ILetter[]) => {
    // получаем пары для замен
    const { animationSteps } = getReverseString(letters);
    if(animationSteps) {
      for(let i = 0; i < animationSteps.length; i++) {
        letters[animationSteps[i].i].state = ElementStates.Changing;
        letters[animationSteps[i].last].state = ElementStates.Changing;
        swapLetters(letters, animationSteps[i].i, animationSteps[i].last);
        updateState({ string: letters });
        await wait(1000);
        letters[animationSteps[i].i].state = ElementStates.Modified;
        letters[animationSteps[i].last].state = ElementStates.Modified;
        updateState({ string: letters });
        await wait(1000);
      }
    }
    const centerIndex = Math.ceil(letters.length / 2) - 1;
    if(letters.length % 2 !== 0) {
      letters[centerIndex].state = ElementStates.Modified;
      updateState({ string: letters });
    }
  };

  const inputHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    let input = evt.target as HTMLInputElement;
    input.value
      ? updateState({ buttonDisabled: false, inputValue: input.value })
      : updateState({ buttonDisabled: true, inputValue: input.value });
  };
  const buttonHandler = async() => {
    const letters:ILetter[] = state.inputValue.split('').map(letter => {
      return {letter, key: nanoid(10), state: ElementStates.Default}
    });
    updateState({ string: letters, buttonLoader: true });
    await wait(500);
    await getAnimations(letters);
    updateState({ buttonLoader: false })
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
