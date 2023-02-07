import React, {useEffect, useReducer} from "react";
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
import {IStateSorting, IArrayColumns, IAnimation} from "../../types/components";
import {ElementStates} from "../../types/element-states";
// вспомогательные функции
import {getRandomArray} from "../../utils/math";
import {nanoid} from "nanoid";
import {bubbleSortAnimations, initialState, parseAnimations, selectSortAnimations} from "./ulits";


export const SortingPage: React.FC = () => {
  let animations: IAnimation[] = [];
  let sort: { animations: IAnimation[], array: number[] };
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

  const ascendingButtonHandler = async() => {
    updateState({buttonLoaders: {...state.buttonLoaders, ascendingBtn: true}, buttonBlocks: {...state.buttonBlocks, descendingBtn: true, newArrayBtn: true, bubbleRadioInput: true, selectRadioInput:  true} });
    state.radioInput === 'bubble' ? sort = bubbleSortAnimations(state.array, 'ascending') : sort = selectSortAnimations(state.array, 'ascending');
    animations = sort.animations;
    state.radioInput === 'bubble' ? await parseAnimations(animations, updateState, state.array, 'bubbleSort') : await parseAnimations(animations, updateState, state.array, 'selectSort');
    await updateState({buttonLoaders: {...state.buttonLoaders, ascendingBtn: false}, buttonBlocks: {...state.buttonBlocks, descendingBtn: false, newArrayBtn: false, bubbleRadioInput: false} });

  };

  const descendingButtonHandler = async () => {
    updateState({buttonLoaders: {...state.buttonLoaders, ascendingBtn: true}, buttonBlocks: {...state.buttonBlocks, descendingBtn: true, newArrayBtn: true, bubbleRadioInput: true, selectRadioInput:  true} });
    state.radioInput === 'bubble' ? sort = bubbleSortAnimations(state.array, 'descending') : sort = selectSortAnimations(state.array, 'descending');
    animations = sort.animations;
    state.radioInput === 'bubble' ? await parseAnimations(animations, updateState, state.array, 'bubbleSort') : await parseAnimations(animations, updateState, state.array, 'selectSort');
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
