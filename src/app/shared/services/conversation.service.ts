import { Injectable } from '@angular/core';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})

export class ConversationService {
  private comments: Comment[] = [
    {
      id: 1,
      userId: 2,
      timestamp: new Date(),
      text: 'Are you still on?',
    },
    {
      id: 2,
      userId: 1,
      timestamp: new Date(),
      text: 'Yeah, I am still working, whats up?',
    },
  ];

  getComments(): Comment[] {
    return this.comments;
  }

  createComment(comment: Comment): void {
    this.comments.push(comment);
  }
}

