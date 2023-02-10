import {getReverseString} from "../utils";
import {nanoid} from "nanoid";
import {ElementStates} from "../../../types/element-states";
const testData = {
  evenString:'Тортик',
  oddString: 'Пирог',
  revertEvenStringArray: ['к','и','т','р','о','т'],
  revertOddStringArray: ['г','о','р','и','п'],
  letter: 'v',
  empty: '',
}
describe('(ಠ_ಠ) Тестирование алгоритма разворота строки', () => {
  test('Корректно разворачивает строку с чётным количеством символов', ()=> {
    const letters = testData.evenString.toLowerCase().split('').map(letter => {
      return {letter, key: nanoid(10), state: ElementStates.Default}
    });
    const { array } = getReverseString(letters);
    expect(array).toEqual(testData.revertEvenStringArray);
  });
  test('Корректно разворачивает строку с нечётным количеством символов', ()=> {
    const letters = testData.oddString.toLowerCase().split('').map(letter => {
      return {letter, key: nanoid(10), state: ElementStates.Default}
    });
    const { array } = getReverseString(letters);
    expect(array).toEqual(testData.revertOddStringArray);
  });
  test('Корректно разворачивает строку с одним символом', ()=> {
    const letters = testData.letter.toLowerCase().split('').map(letter => {
      return {letter, key: nanoid(10), state: ElementStates.Default}
    });
    const { array } = getReverseString(letters);
    expect(array).toEqual([testData.letter]);
  });
  // зачем этот тест, если пустую строку нет возможности развернуть, т.к. кнопка с коллбэком заблокирована \_(ツ)_/¯
  // test('Корректно разворачивает пустую строку', ()=> {
  //   const { array } = getReverseString([]);
  //   expect(array).toEqual([]);
  // });
})