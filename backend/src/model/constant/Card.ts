export type Card = {
  id: string;
  name: string;
  interpretation: {
    upright: string[];
    reversed: string[];
  };
};
