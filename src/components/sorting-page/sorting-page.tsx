import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css';
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import React, {useEffect, useReducer} from "react";
import {Direction} from "../../types/direction";
import {IStateSorting, TBubbleSort, IArrayColumns, TSelectSort} from "../../types/components";
import {getRandomArray} from "../../utils/math";
import {Column} from "../ui/column/column";
import {swapColumns, wait} from "../../utils/utils";
import {nanoid} from "nanoid";
import {ElementStates} from "../../types/element-states";

export const SortingPage: React.FC = () => {

  const selectSort:TSelectSort = (array, type) => {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
      let min = i;
      for (let j = i + 1; j < n; j++) {
        if (array[min].number > array[j].number) min = j;
      }
      swapColumns(array, i, min);
    }
    console.log(array);
  }
  const bubbleSort:TBubbleSort = async (array, type) => {
    const n = array.length;
    for(let i = 0; i < n - 1; i++) {
      for(let j = 0; j < n - 1 - i; j++) {
        array[j].state = ElementStates.Changing;
        array[j+1].state = ElementStates.Changing;
        updateState({ array: array });
        if (type === 'descending') {
          if(array[j+1].number > array[j].number) {
            swapColumns(array, j+1, j);
            await wait(1000);
          }
        };
        if (type === 'ascending') {
          if(array[j+1].number < array[j].number) {
            swapColumns(array, j, j+1);
            await wait(1000);
          }
        };
        array[j].state = ElementStates.Default;
        array[j+1].state = ElementStates.Modified;
        updateState({ array: array });
      }
    }
    array[0].state = ElementStates.Modified;
    updateState({buttonLoaders: {...state.buttonLoaders, ascendingBtn: false}, buttonBlocks: {...state.buttonBlocks, descendingBtn: false, newArrayBtn: false, bubbleRadioInput: false}, array: array });

  }

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
      bubbleRadioInput: false,
      selectRadioInput: false,
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
    const columns = getRandomColumns();
    updateState({ array: columns });
  }, []);

  const getRandomColumns = () => {
    const array = getRandomArray();
    let columns: IArrayColumns[] = [];
    array.forEach(arr => columns.push({number: arr, key: nanoid(10), state: ElementStates.Default}));
    return columns;
  }

  const ascendingButtonHandler = () => {
    updateState({buttonLoaders: {...state.buttonLoaders, ascendingBtn: true}, buttonBlocks: {...state.buttonBlocks, descendingBtn: true, newArrayBtn: true, bubbleRadioInput: true, selectRadioInput:  true} });
    state.radioInput === 'bubble' ? bubbleSort(state.array, 'ascending') : selectSort(state.array, 'ascending');
  };

  const descendingButtonHandler = () => {
    updateState({buttonLoaders: {...state.buttonLoaders, ascendingBtn: true}, buttonBlocks: {...state.buttonBlocks, descendingBtn: true, newArrayBtn: true, bubbleRadioInput: true, selectRadioInput:  true} });
    state.radioInput === 'bubble' ? bubbleSort(state.array, 'descending') : selectSort(state.array, 'descending');
  };

  const newArrayButtonHandler = () => {
    const columns = getRandomColumns();
    updateState({ array: columns });
  };

  const radioInputHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    let inputValue = evt.target as HTMLInputElement;
    updateState({ radioInput: inputValue.value});
  };
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
              disabled={state.buttonBlocks.bubbleRadioInput}
              checked={state.radioInput === "select"}
              onChange={(evt) => radioInputHandler(evt)}
            />
            <RadioInput
              label={"Пузырек"}
              name={"sortingName"}
              extraClass={styles.input}
              value={"bubble"}
              disabled={state.buttonBlocks.selectRadioInput}
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
              extraClass={styles.button}
            />
            <Button
              text={"По убыванию"}
              isLoader={state.buttonLoaders.descendingBtn}
              disabled={state.buttonBlocks.descendingBtn}
              onClick={descendingButtonHandler}
              sorting={Direction.Descending}
              extraClass={styles.button}
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
          { state.array && state.array.map(column => <li key={column.key}>
              <Column index={column.number} state={column.state}/>
            </li>)
          }
        </ul>
      </div>
    </SolutionLayout>
  );
};
