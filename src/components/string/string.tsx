import React, {useState} from "react";
import { nanoid } from 'nanoid';
// компоненты
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
// ui
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
// стили
import styles from './string.module.css';
import {outputString, sort} from "../../utils/utils";
import {getReverseString} from "../../utils/sorting";

interface IState {
  buttonLoader: boolean,
  buttonDisabled: boolean,
  inputValue: string,
  string: null | [] | JSX.Element[],
  visibleString: boolean
}
export const StringComponent: React.FC = () => {
  const objects = Array.from(document.querySelectorAll('.letter'));
  const [state, setState] = useState<IState>({
    buttonLoader: false,
    buttonDisabled: true,
    inputValue: '',
    string: null,
    visibleString: false,
  });
  const [animations, setAnimations] = useState();

  const inputHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    console.log('inputHandler');
    let input = evt.target as HTMLInputElement;
    input.value ? setState({...state, buttonDisabled: false, inputValue: input.value}): setState({...state, buttonDisabled: true, inputValue: input.value});
  };

  const buttonHandler = () => {
    console.log('buttonHandler');
    const letters = state.inputValue.split('').map(letter => {
      return {letter, key: nanoid(10)}
    });
    const str = outputString(letters);
    setTimeout(() => {
      console.log(objects);
      sort('revert', letters, setAnimations, objects);
      // getReverseString(letters)
    }, 500);
    setState({...state, inputValue: '', visibleString: true, string: str});
  };

  return (
    <SolutionLayout title="Строка" >
      <div className={styles.mainWrapper}>
        <div className={styles.wrapper}>
          <Input
            maxLength={11}
            extraClass={styles.input}
            onChange={inputHandler}
            value={state.inputValue}
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
          {state.visibleString && state.string}
        </ul>
      </div>
    </SolutionLayout>
  );
};
