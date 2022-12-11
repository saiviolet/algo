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
}