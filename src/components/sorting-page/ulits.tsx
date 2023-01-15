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
  return {animations: animationsArray}
}

export async function parseAnimations(animations: IAnimation[], updateState: Dispatch<any>, arr: IArrayColumns[]) {
  //циклом пройтись по анимациям
  for(const animation of animations) {
    //деструктуризация объекта анимации
    const { type, data, array } = animation;
    //деструктуризация массива data со значениями i, j
    const [i, j] = data;
    //проверяем тип анимациии
    //если тип равен  swap
    if (type === 'select') {
      // проходимся и выделяем цветом
      if (arr) {
        arr[i].state = ElementStates.Changing;
        arr[j].state = ElementStates.Changing;
        updateState({array: arr});
        await wait(500);
        arr[j].state = ElementStates.Default;
      }
    }
    if (type === 'swap') {
      //выделить рамкой карточки
      if (arr) {
        arr[i].state = ElementStates.Modified;
        swapColumns(arr, i, j);
      }
    }
    if (type === 'swap' && array) {
      updateState({array: arr})
    }

  }
  // замена цвета для послденего эл-та
  arr[arr.length-1].state = ElementStates.Modified;
  updateState({array: arr})
}

export const bubbleSortAnimations:TBubbleSort = async (array, type) => {
  const n = array.length;
  for(let i = 0; i < n - 1; i++) {
    for(let j = 0; j < n - 1 - i; j++) {
      array[j].state = ElementStates.Changing;
      array[j+1].state = ElementStates.Changing;
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
    }
  }
  array[0].state = ElementStates.Modified;
}