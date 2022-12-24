import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css';
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import React, {useEffect, useReducer} from "react";
import {Direction} from "../../types/direction";
import {IStateSorting, IChart} from "../../types/components";
import {getRandomArray} from "../../utils/math";
import {Column} from "../ui/column/column";

export const SortingPage: React.FC = () => {

  const initialState:IStateSorting = {
    buttonLoaders: {
      ascendingBtn: false,
      descendingBtn: false,
      newArrayBtn: false,
    },
    buttonBlocks: {
      ascendingBtn: false,
      descendingBtn: false,
      newArrayBtn: false,
    },
    inputValue: '',
    radioInput: "select",
    array: [],
  };

  const [state, updateState] = useReducer<(state: IStateSorting, updates: any) => IStateSorting>(
    (state, updates) => ({ ...state, ...updates }),
    initialState
  );

  useEffect(() => {
    const array = getRandomArray();
    console.log(array);
    updateState({ array: array });
  }, [])

  const ascendingButtonHandler = () => {

  };

  const descendingButtonHandler = () => {

  };

  const newArrayButtonHandler = () => {
    const array = getRandomArray();
    updateState({ array: array });
  };

  const radioInputHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    let inputValue = evt.target as HTMLInputElement;
    updateState({ radioInput: inputValue.value});
  };
console.log(state);
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.mainWrapper}>
        <div className={styles.wrapper}>
          <ul className={styles.sortingName}>
            <RadioInput
              label={"Выбор"}
              name={"sortingName"}
              extraClass={styles.input}
              value={"select"}
              checked={state.radioInput === "select"}
              onChange={(evt) => radioInputHandler(evt)}
            />
            <RadioInput
              label={"Пузырек"}
              name={"sortingName"}
              extraClass={styles.input}
              value={"bubble"}
              checked={state.radioInput === "bubble"}
              onChange={(evt) => radioInputHandler(evt)}
            />
          </ul>
          <div className={styles.sortingType}>
            <Button
              text={"По возрастанию"}
              isLoader={state.buttonLoaders.ascendingBtn}
              disabled={state.buttonBlocks.ascendingBtn}
              onClick={ascendingButtonHandler}
              sorting={Direction.Ascending}
            />
            <Button
              text={"По убыванию"}
              isLoader={state.buttonLoaders.descendingBtn}
              disabled={state.buttonBlocks.descendingBtn}
              onClick={descendingButtonHandler}
              sorting={Direction.Descending}
            />
          </div>
          <Button
            text={"Новый массив"}
            isLoader={state.buttonLoaders.newArrayBtn}
            disabled={state.buttonBlocks.newArrayBtn}
            onClick={newArrayButtonHandler}
            extraClass={styles.button}
          />
        </div>
        <ul className={styles.chart}>
          { state.array && state.array.map((column, index) => <li key={`${index}-${column}`}>
              <Column index={column} />
            </li>)
          }
        </ul>
      </div>
    </SolutionLayout>
  );
};
