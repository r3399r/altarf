import { User } from 'src/model/entity/UserEntity';

export type GetUserResponse = User & {
  freeQuota: number;
  lastFree: string | null;
};
