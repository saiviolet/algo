import {ILetter, IStateString} from "../../types/components";
import {swap} from "../../utils/utils";

type TSwapLetters = (array: ILetter[], i: number, min: number) => void;
export const initialState:IStateString = {
  buttonLoader: false,
  buttonDisabled: true,
  inputValue: '',
  string: null,
};

interface IReverseString {
  animationSteps: {
    i: number,
    last: number
  }[] | undefined;
  array?: string[]
}

export const swapLetters:TSwapLetters = (array, i, min) => {
  //копия значения по индексу  i
  const copy = array[i].letter;
  array[i].letter = array[min].letter;
  array[min].letter = copy;
};

export const getReverseString = (letters: ILetter[]): IReverseString => {
  if(letters.length <= 1) {
    if(letters.length === 0) return {animationSteps: undefined, array: []}
    return {animationSteps: undefined, array: [letters[0].letter]}
  }
  else {
    const copyArr:ILetter[] = Object.assign([], letters);
    let last;
    let animationsArray: { i: number, last: number }[] = [];
    for (let i = 0; i < copyArr.length; i++) {
      last = (copyArr.length - 1) - i;
      if(i < last) {
        animationsArray.push({i, last});
        swap(copyArr, i, last);
      }
    };
    const arrayForTesting = copyArr.map(item => item.letter);
    return {animationSteps: animationsArray, array: arrayForTesting};
  }
}