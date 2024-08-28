import { Injectable } from '@angular/core';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  //!  extract into mock data file.
  private users: User[] = [
    { name: 'Austin', photo: "/austinUserImage.png", id: 1, taggedConversationIds: [] },
    { name: 'Courtney', photo: "/courtney_user_image.jpg", id: 2, taggedConversationIds: [] },
    { name: 'Hazel', photo: "/hazel_user_image.jpg", id: 3, taggedConversationIds: [] },
    { name: 'Curtis', photo: "/curtis_user_image.png", id: 4, taggedConversationIds: [] }
  ];

  getUsers(): User[] {
    // This would be an api call to a getUsers endpoint.
    return this.users;
  }
}
