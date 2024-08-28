import { Injectable } from '@angular/core';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})

export class ConversationService {
  private comments: Comment[] = [];
  // would be api calls.
  getComments(): Comment[] {
    return this.comments;
  }

  createComment(comment: Comment): void {
    this.comments.push(comment);
  }
}

