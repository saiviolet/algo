import {ILetter, IStateString} from "../../types/components";
import {swap} from "../../utils/utils";

type TSwapLetters = (array: ILetter[], i: number, min: number) => void;
export const initialState:IStateString = {
  buttonLoader: false,
  buttonDisabled: true,
  inputValue: '',
  string: null,
};

export const swapLetters:TSwapLetters = (array, i, min) => {
  //копия значения по индексу  i
  const copy = array[i].letter;
  array[i].letter = array[min].letter;
  array[min].letter = copy;
};

export const getReverseString = (letters: ILetter[]):{i: number, last: number}[] => {
  const copyArr = Object.assign([], letters);
  let last;
  let animationsArray: any[] = [];
  for (let i = 0; i < copyArr.length; i++) {
    last = (copyArr.length - 1) - i;
    if(i < last) {
      animationsArray.push({i, last});
      swap(copyArr, i, last);
    }
  };
  return animationsArray;
}