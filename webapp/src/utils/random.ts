export const randomInt = (min: number, max: number) => {
  if (min > max) throw new Error('min must be less than max');

  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomBoolean = () => randomInt(0, 1) === 0;
