// ф-ия для переворота строки
import {swap} from "./utils";

export const getReverseString = (str: any[]) => {
  let revert = '';
  let first;
  let last;
  const copyArray = [...str];
  const animationsArray = [];
  for (let i = 0; i < str.length; i++){
    last = (str.length - 1) - i;
    first = i;
    revert += str[(str.length - 1) - i];
    swap(copyArray, first, last);
    animationsArray.push( { type: 'swap', data: [first, last], array: [...copyArray] } );
  }
  console.log(animationsArray);
  return {animations: animationsArray};
}