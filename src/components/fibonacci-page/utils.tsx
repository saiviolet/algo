import {IStateFibonacci, TFibonacci} from "../../types/components";
import {wait} from "../../utils/utils";

export const initialState:IStateFibonacci = {
  buttonLoader: false,
  buttonDisabled: true,
  inputValue: '',
  number: null,
  array: [],
};

export const fibonacci: TFibonacci = async (n, updateState) => {
  updateState({ buttonLoader: true })
  let a = 1;
  let b = 1;
  let array = [];
  if (n === 1) {
    array.push(a);
    updateState({ array: array });
  }
  else {
    array.push(a);
    updateState({ array: array });
    await wait(1000);
    array.push(b);
    updateState({ array: array });
    await wait(1000);
    for (let i = 3; i <= n+1; i++) {
      let c = a + b;
      a = b;
      b = c;
      array.push(b);
      updateState({ array: array });
      await wait(1000);
    }
  }
  updateState({ buttonLoader: false });
}