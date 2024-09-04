import { Injectable } from '@angular/core';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  sendNotifcation(comment: Comment) {
    console.log('POST to notification client ' + JSON.stringify(comment, null, 2));
  }
}
