import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationService } from '../../shared/services/conversation.service'
import { Comment } from '../../shared/models/comment.model';
import { CommentInputComponent } from '../comment-input/comment-input.component';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';
import { UserPopupComponent } from '../user-popup/user-popup.component';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [CommonModule, CommentInputComponent, UserPopupComponent],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss'
})
export class ConversationComponent implements OnInit {
  comments: Comment[] = [];
  showUserPopup = false;
  // users: User[] = []

  constructor(private conversationService: ConversationService, private userService: UserService) { }

  ngOnInit(): void {
    this.comments = this.conversationService.getComments();
    // this.users = this.userService.getUsers();
  }

  addComment(comment: string): void {
    const newComment: Comment = {
      id: 2, //! use conversation service to return us the previous length of comments array and += 1;
      userId: 6, //! use the User service to return this value;
      timestamp: new Date(),
      text: comment,
    };

    this.conversationService.createComment(newComment); // Add new comment to state in service;
    this.comments = this.conversationService.getComments(); // Update the comments array;
  }

  closeUserPopup() {
    this.showUserPopup = false;
  }

  handleInputFocus(focused: boolean) {
    if (!focused) {
      this.showUserPopup = false;
    }
  }

};
