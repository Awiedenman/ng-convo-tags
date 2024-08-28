import { Injectable } from '@angular/core';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { name: 'Austin', photo: "/userimage_1.png", id: 1, taggedConversationIds: [] },
    { name: 'Courtney', photo: "/userimage_2.jpg", id: 2, taggedConversationIds: [] },
    { name: 'Hazel', photo: "/userimage_3.jpg", id: 3, taggedConversationIds: [] },
    { name: 'Curtis', photo: "/userimage_4.png", id: 4, taggedConversationIds: [] }
  ];

  getUsers(): User[] {
    // This would be an api call to a getUsers endpoint.
    return this.users;
  }
}
