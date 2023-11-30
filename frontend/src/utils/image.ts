export const getImageUrl = (src: string) => new URL(src, import.meta.url).href;
