import React, {useState} from "react";
import { nanoid } from 'nanoid';
// компоненты
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
// ui
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
// стили
import styles from './string.module.css';

type TOutputString = (letters: { letter: string, key: string}[]) => JSX.Element[];
interface IState {
  buttonLoader: boolean,
  buttonDisabled: boolean,
  inputValue: string,
  string: null | [] | JSX.Element[],
  visibleString: boolean
}
export const StringComponent: React.FC = () => {
  const [state, setState] = useState<IState>({
    buttonLoader: false,
    buttonDisabled: true,
    inputValue: '',
    string: null,
    visibleString: false,
  });

  const outputString:TOutputString = (letters) => {
    return letters.map((letter:any) => <li key={letter.key}>
      <Circle letter={letter.letter}/>
    </li>)
  };
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
