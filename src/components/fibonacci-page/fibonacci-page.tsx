import React, {useEffect, useReducer} from "react";
// компоненты
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
// ui
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
//функции
import {fibonacci} from "../../utils/math";
//стили
import styles from "./fibonacci-page.module.css";
import {IStateFibonacci} from "../../types/components";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
export const FibonacciPage: React.FC = () => {

  const initialState:IStateFibonacci = {
    buttonLoader: false,
    buttonDisabled: true,
    inputValue: '',
    number: null,
    array: [],
  };

  const [state, updateState] = useReducer<(state: IStateFibonacci, updates: any) => IStateFibonacci>(
    (state, updates) => ({ ...state, ...updates }),
    initialState
  );
  const inputHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    let input = evt.target as HTMLInputElement;
    let value = input.value.replace(/^\d{3}$/, '');
    input.value
      ? updateState({ buttonDisabled: false, inputValue: value })
      : updateState({ buttonDisabled: true, inputValue: value });
  };

  const fanny = (value: number | typeof NaN) => {
    let number = value;
    updateState({ number: number });
    let result = window.confirm('Ну и для кого указан диапазон? Ох уж эта молодежь, не читает. Ты точно теперь введешь число 0 до 19?');
    if (result) {
      let number = Number(prompt('Давай пиши. И даже не вздумай писать символы или числа больше 19'));
      updateState({ number: number, inputValue: number})
      if((typeof(number) !== "number") || ((number < 0) || (number > 19)) || (isNaN(number))) fanny(number)
    }
    else alert('¯\\_(ツ)_/¯');
  }
  function buttonHandler () {
    const value = Number(state.inputValue);
    if ((value > 19) || (value < 0 ) || (isNaN(value))) fanny(value)
    else {
      updateState({ number: value });
    }git
  };
  useEffect(() => {
    if(state.number) {
      const array = fibonacci(state.number);
      updateState({ array: array });
    }
  }, [state.number]);
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.mainWrapper}>
        <div className={styles.wrapper}>
          <Input
            value={state.inputValue}
            placeholder={"Введите число от 1 до 19"}
            max={19}
            extraClass={styles.input}
            onChange={inputHandler}
            type={"number"}
            isLimitText
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
          { state.number && state.array.map(number => <Circle letter={String(number)} />)
          }
        </ul>
      </div>
    </SolutionLayout>
  );
};
