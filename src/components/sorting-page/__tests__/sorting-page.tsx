import {selectSortAnimations , bubbleSortAnimations} from "../ulits";
import {nanoid} from "nanoid";
import {ElementStates} from "../../../types/element-states";
import {IArrayColumns} from "../../../types/components";

const testArray = [12,77,3,8,17];
const sortTestArray = [3,8,12,17,77];
let arraySelectSort:IArrayColumns[] = [];
let arrayBubbleSort:IArrayColumns[] = [];
describe('Тестирование алгоритмов сортировки выбором', () => {
  test('Корректно сортирует массив из нескольких элементов', () => {
    testArray.forEach(arr => arraySelectSort.push({number: arr, key: nanoid(10), state: ElementStates.Default}));
    expect(selectSortAnimations(arraySelectSort,"ascending").array).toEqual(sortTestArray);
  });
  test('Корректно сортирует пустой массив', () => {
    expect(selectSortAnimations([],"ascending").array).toEqual([]);
  });
  test('Корректно сортирует массив', () => {
    const array = [{number: 22, key: nanoid(10), state: ElementStates.Default}]
    expect(selectSortAnimations(array,"ascending").array).toEqual([22]);
  });
});
describe('Тестирование алгоритмов сортировки пузырьком', () => {
  test('Корректно сортирует массив из нескольких элементов', () => {
    testArray.forEach(arr => arrayBubbleSort.push({number: arr, key: nanoid(10), state: ElementStates.Default}));
    expect(bubbleSortAnimations(arrayBubbleSort,"ascending").array).toEqual(sortTestArray);
  });
  test('Корректно сортирует пустой массив', () => {
    expect(bubbleSortAnimations([],"ascending").array).toEqual([]);
  });
  test('Корректно сортирует массив', () => {
    const array = [{number: 22, key: nanoid(10), state: ElementStates.Default}]
    expect(bubbleSortAnimations(array,"ascending").array).toEqual([22]);
  });
})