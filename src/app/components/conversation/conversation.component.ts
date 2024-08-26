import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationService } from '../../shared/services/conversation.service'
import { Comment } from '../../shared/models/comment.model';
import { CommentInputComponent } from '../comment-input/comment-input.component';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [CommonModule, CommentInputComponent],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss'
})
export class ConversationComponent implements OnInit {
  comments: Comment[] = [];

  constructor(private conversationService: ConversationService) { }

  ngOnInit(): void {
    this.comments = this.conversationService.getComments();
  }

  onCommentSubmitted(comment: string): void {
    console.log('1', comment)
    const newComment: Comment = {
      id: 2, //! use conversation service to return us the previous length of comments array and += 1;
      userId: 6, //! use the User service to return this value;
      timestamp: new Date(),
      text: comment,
    };

    this.conversationService.createComment(newComment); // Add new comment to state in service;
    this.comments = this.conversationService.getComments(); // Update the comments array;
  }
};
