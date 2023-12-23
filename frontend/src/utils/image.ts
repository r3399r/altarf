export const getCardImageUrl = (id: string) =>
  new URL(`../assets/card/${id}.jpg`, import.meta.url).href;
