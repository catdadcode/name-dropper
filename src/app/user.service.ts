import { Injectable } from '@angular/core';
import type { User } from 'types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getUsers(): User[] {
    return [
      { id: 1, name: 'Kevin', status: 'online' },
      { id: 2, name: 'Jeff', status: 'online' },
      { id: 3, name: 'Julie', status: 'busy' },
      { id: 4, name: 'Bryan', status: 'idle' },
      { id: 5, name: 'Gabbey', status: 'offline' },
    ];
  }
}
