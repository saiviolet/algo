import {Circle} from "../components/ui/circle/circle";
import {getReverseString} from "./sorting";
type TOutputString = (letters: { letter: string, key: string}[]) => JSX.Element[];
// ф-ия для правильно вывода окончания в подсказке к инпуту
export const declination = (count: number | undefined) => {
  const array = ['символ', 'символа', 'символов'];
  if (count) {
    count = Math.abs(count) % 100;
    let c1 = count % 10;
    if (count > 10 && count < 20) return array[2];
    if (c1 > 1 && c1 < 5) return array[1];
    if (c1 == 1) return array[0];
  }
  return array[2];
};
// ф-ия для вывода значений в кружочках
export const outputString:TOutputString = (letters) => {
  return letters.map((letter:any) => <li key={letter.key} className="letter">
  <Circle letter={letter.letter}/>
  </li>)
};

// ф-ия ожидания между анимациями
export const wait  = (ms: number) => {
  return new Promise( resolve => setTimeout(resolve, ms));
};

// функция парсинга анимации
async function parseAnimations(animations: { type: string; data: number[]; array: any[]; }[], setAnimations: any, objects: any[]) {
    //циклом пройтись по анимациям
    for(const animation of animations) {
      //деструктуризация объекта анимации
      const { type, data, array } = animation;
      //деструктуризация массива data со значениями i, j
      const [i, j] = data;
      //проверяем тип анимациии
      //если тип равен  swap
      if (type === 'swap') {
        //выделить рамкой карточки
        objects[i].classList.add('changing');
        // console.log(objects[j]);
      }
      // if (type === 'select') {
      //   //другой цвет карточки
      //   refs[i].current.classList.add(`${style.villian__card_activeSelect}`);
      //   refs[j].current.classList.add(`${style.villian__card_activeSelect}`);
      // }
      await wait(300);

      if (type === 'swap' && array) {
        setAnimations(array);
      }
      // console.log(objects[i]);
      // console.log(objects[j]);
    }

};

//функция выбора типа сортировки в зависимости от значения  в селекте
export async function sort(name: string, letters: any[], setAnimations: React.Dispatch<React.SetStateAction<undefined>>, objects: any[]) {
  let animations:{ type: string; data: number[]; array: any[]; }[];
  let result;
  switch (name) {
    case "revert":
      result = getReverseString(letters);
      break;
    // case "insertion":
    //   result = getInsertionSortAnimations(villainsArray);
    //   break;
    // case "bubble":
    //   result = getBubbleSortAnimations(villainsArray);
    //   break;
    // case "comb":
    //   result = getCombSortAnimations(villainsArray);
    //   break;
    default:
      console.log('test test test');
  }
  if (result) {
    animations = result.animations;
    await parseAnimations(animations, setAnimations, objects);
    // @ts-ignore
    setAnimations(result);
  }
}