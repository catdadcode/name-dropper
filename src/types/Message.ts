import { User } from './User';

export type Message = {
  userId: User['id'];
  text: string;
  mentions?: User['id'][];
};
