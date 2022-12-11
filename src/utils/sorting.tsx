// ф-ия для переворота строки
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
    animationsArray.push( { type: 'swap', data: [first, last], array: [...copyArray] } );
  }
  return {animations: animationsArray};
}