import React, {useEffect, useReducer, useState} from "react";
// компоненты
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
// стили
import styles from './sorting-page.module.css';
// юай
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import {Column} from "../ui/column/column";
// типы
import {Direction} from "../../types/direction";
import {IStateSorting, TBubbleSort, IArrayColumns, TSelectSort} from "../../types/components";
import {ElementStates} from "../../types/element-states";
// вспомогательные функции
import {getRandomArray} from "../../utils/math";
import {swapColumns, wait} from "../../utils/utils";
import {nanoid} from "nanoid";
import {initialState, parseAnimations, selectSortAnimations} from "./ulits";


export const SortingPage: React.FC = () => {
  // const selectSort:TSelectSort = async (array, type) => {
  //   const n = array.length;
  //   for (let i = 0; i < n - 1; i++) {
  //     let min = i;
  //     array[i].state = ElementStates.Changing;
  //     updateState({ array: array });
  //     for (let j = i + 1; j < n; j++) {
  //       if (type === 'ascending') {
  //         if (array[min].number > array[j].number) min = j;
  //       };
  //       if (type === 'descending') {
  //         if (array[min].number < array[j].number) min = j;
  //       }
  //       array[j].state = ElementStates.Changing;
  //       updateState({ array: array });
  //       await wait(500);
  //       array[j].state = ElementStates.Default;
  //     }
  //     swapColumns(array, i, min);
  //     array[i].state = ElementStates.Modified;
  //   }
  //   array[n-1].state = ElementStates.Modified;
  //   updateState({buttonLoaders: {...state.buttonLoaders, ascendingBtn: false}, buttonBlocks: {...state.buttonBlocks, descendingBtn: false, newArrayBtn: false, bubbleRadioInput: false}, array: array });
  // }
  // const bubbleSort:TBubbleSort = async (array, type) => {
  //   const n = array.length;
  //   for(let i = 0; i < n - 1; i++) {
  //     for(let j = 0; j < n - 1 - i; j++) {
  //       array[j].state = ElementStates.Changing;
  //       array[j+1].state = ElementStates.Changing;
  //       updateState({ array: array });
  //       if (type === 'descending') {
  //         if(array[j+1].number > array[j].number) {
  //           swapColumns(array, j+1, j);
  //           await wait(1000);
  //         }
  //       };
  //       if (type === 'ascending') {
  //         if(array[j+1].number < array[j].number) {
  //           swapColumns(array, j, j+1);
  //           await wait(1000);
  //         }
  //       };
  //       array[j].state = ElementStates.Default;
  //       array[j+1].state = ElementStates.Modified;
  //       updateState({ array: array });
  //     }
  //   }
  //   array[0].state = ElementStates.Modified;
  //   updateState({buttonLoaders: {...state.buttonLoaders, ascendingBtn: false}, buttonBlocks: {...state.buttonBlocks, descendingBtn: false, newArrayBtn: false, bubbleRadioInput: false}, array: array });
  // }

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
  };

  const ascendingButtonHandler = () => {
    updateState({buttonLoaders: {...state.buttonLoaders, ascendingBtn: true}, buttonBlocks: {...state.buttonBlocks, descendingBtn: true, newArrayBtn: true, bubbleRadioInput: true, selectRadioInput:  true} });
    // state.radioInput === 'bubble' ? bubbleSort(state.array, 'ascending') : selectSort(state.array, 'ascending');
  };

  const descendingButtonHandler = async () => {
    let animations = [];
    updateState({buttonLoaders: {...state.buttonLoaders, ascendingBtn: true}, buttonBlocks: {...state.buttonBlocks, descendingBtn: true, newArrayBtn: true, bubbleRadioInput: true, selectRadioInput:  true} });
    // state.radioInput === 'bubble' ? bubbleSort(state.array, 'descending') : selectSort(state.array, 'descending');
    const sort = selectSortAnimations(state.array, 'descending');
    animations = sort.animations;
    await parseAnimations(animations, updateState, state.array);
    await updateState({buttonLoaders: {...state.buttonLoaders, ascendingBtn: false}, buttonBlocks: {...state.buttonBlocks, descendingBtn: false, newArrayBtn: false, bubbleRadioInput: false} });
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
