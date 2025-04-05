const randomInt = (min: number, max: number) => {
  if (min > max) throw new Error('min must be less than max');

  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomBoolean = () => (randomInt(0, 1) === 0 ? false : true);

const pickRandomElement = <T>(arr: T[]): T => arr[randomInt(0, arr.length - 1)];

export const randomIntExcept = (min: number, max: number, except: number[]) => {
  const choice = [...Array(max - min + 1)]
    .map((_v, i) => min + i)
    .filter((v) => !except.includes(v));
  if (choice.length === 0) throw new Error('no choice');

  return pickRandomElement(choice);
};
