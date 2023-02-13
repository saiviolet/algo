import {IAnimation, IArrayColumns, IStateSorting, TBubbleSort, TSelectSort} from "../../types/components";
import {ElementStates} from "../../types/element-states";
import {swapColumns, wait} from "../../utils/utils";
import {Dispatch} from "react";

export const initialState:IStateSorting = {
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

export const selectSortAnimations:TSelectSort = (array, type) => {
  const copyArray: IArrayColumns[] = JSON.parse(JSON.stringify(array));
  const animationsArray = [];
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      animationsArray.push( { type: 'select', data: [i, j] } );
      if (type === 'ascending') {
        if (copyArray[min].number > copyArray[j].number) min = j;
      };
      if (type === 'descending') {
        if (copyArray[min].number < copyArray[j].number) min = j;
      }
    }
    swapColumns(copyArray, i, min);
    animationsArray.push( { type: 'swap', data: [i, min], array: [...copyArray] } );
  }
  const arrayForTesting = copyArray.map(item => item.number);
  return {animations: animationsArray, array: arrayForTesting}
}

export async function parseAnimations(animations: IAnimation[], updateState: Dispatch<any>, arr: IArrayColumns[], algorithm: string) {
  //циклом пройтись по анимациям
  for(const animation of animations) {
    //деструктуризация объекта анимации
    const { type, data, array } = animation;
    //деструктуризация массива data со значениями i, j
    const [i, j] = data;
    // анимация для выборочной сортировки
    if(algorithm === 'selectSort') {
      //проверяем тип анимациии
      //если тип равен  swap
      if (type === 'select') {
        // проходимся и выделяем цветом
        arr[i].state = ElementStates.Changing;
        arr[j].state = ElementStates.Changing;
        updateState({array: arr});
        await wait(500);
        arr[j].state = ElementStates.Default;
      }
      if (type === 'swap') {
        //выделить рамкой карточки
        arr[i].state = ElementStates.Modified;
        swapColumns(arr, i, j);
      }
      if (type === 'swap' && array) {
        updateState({array: arr})
      }
    }
    // анимация для сортировки пузырьком
    if(algorithm === 'bubbleSort') {
      if (type === 'select') {
        arr[i].state = ElementStates.Changing;
        arr[j].state = ElementStates.Changing;
        updateState({array: arr});
        await wait(500);
        arr[i].state = ElementStates.Default;
        updateState({array: arr});
        arr[j].state = ElementStates.Modified;
      }
      if (type === 'swap') {
          swapColumns(arr, i, j);
      }
    }
  }
  algorithm === 'selectSort' ? arr[arr.length-1].state = ElementStates.Modified : arr[0].state = ElementStates.Modified;
}

export const bubbleSortAnimations:TBubbleSort = (array, type) => {
  const copyArray: IArrayColumns[] = JSON.parse(JSON.stringify(array));
  const animationsArray = [];
  const n = array.length;
  for(let i = 0; i < n - 1; i++) {
    for(let j = 0; j < n - 1 - i; j++) {
      animationsArray.push( { type: 'select', data: [j, j+1] } );
      if (type === 'descending') {
        if(copyArray[j+1].number > copyArray[j].number) {
          swapColumns(copyArray, j+1, j);
          animationsArray.push( { type: 'swap', data: [j+1, j], array: [...copyArray] } );
        }
      };
      if (type === 'ascending') {
        if(copyArray[j+1].number < copyArray[j].number) {
          swapColumns(copyArray, j, j+1);
          animationsArray.push( { type: 'swap', data: [j, j+1], array: [...copyArray] } );
        }
      };
    }
  };
  const arrayForTesting = copyArray.map(item => item.number);
  return {animations: animationsArray, array: arrayForTesting}
}