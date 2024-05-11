export type User = {
  id: number;
  name: string;
  status: 'online' | 'idle' | 'busy' | 'offline';
};
