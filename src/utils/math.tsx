import {wait} from "./utils";

type TFibonacci = (n: number) => number[];
export const fibonacci: TFibonacci = (n) => {
  let a = 1;
  let b = 1;
  let array = [a,b];
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
    array.push(b);
  }
  return array
}