import { Injectable } from '@angular/core';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  //!  extract into mock data file.
  private users: User[] = [
    { name: 'Austin', id: 1, taggedConversationIds: [] },
    { name: 'Courtney', id: 2, taggedConversationIds: [] },
    { name: 'Hazel', id: 3, taggedConversationIds: [] },
    { name: 'Curtis', id: 4, taggedConversationIds: [] }
  ];

  getUsers(): User[] {
    return this.users;
  }
}
