import { ROUND_HALF_CEIL } from 'bignumber.js';
import { bn } from './bignumber';

export const fee = (cost: number) =>
  cost * 0.05 > 5
    ? bn(cost * 0.05)
        .dp(0, ROUND_HALF_CEIL)
        .toNumber()
    : +5;
