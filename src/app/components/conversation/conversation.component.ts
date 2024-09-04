import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationService } from '../../shared/services/conversation.service';
import { Comment } from '../../shared/models/comment.model';
import { CommentInputComponent } from '../comment-input/comment-input.component';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';
import { UserPopupComponent } from '../user-popup/user-popup.component';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [CommonModule, CommentInputComponent, UserPopupComponent],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss',
})
export class ConversationComponent implements OnInit {
  comments: Comment[] = [];
  showUserPopup: boolean = false;
  users: User[] = [];
  filteredUsers: User[] = [];
  commentCurrentUserInfo: User = {
    name: '',
    photoURL: '',
    id: 0,
    taggedConversationIds: [],
  };
  taggedUser: User = {
    name: '',
    photoURL: '',
    id: 0,
    taggedConversationIds: [],
  };

  constructor(private conversationService: ConversationService, private userService: UserService, private notificationService: NotificationService) {};

  ngOnInit(): void {
    this.comments = this.conversationService.getComments();
    this.users = this.userService.getUsers();
  };

  addComment(comment: string): void {
    const timestamp = new Date();
    const newComment: Comment = {
      id: this.conversationService.getComments.length + 1,
      userId: 5, // hard coded bc as of now it is only me that can input comments, but this would come from a current authenticated user object.
      recipient: this.taggedUser.id,
      timestamp: timestamp,
      displayTime: this.convertDateTime(timestamp),
      text: comment,
    };

    this.conversationService.createComment(newComment);
    this.comments = this.conversationService.getComments();
    this.notificationService.sendNotifcation(newComment);
    this.closeUserPopup();
    this.showUserImage(newComment.userId);
  };

  showUserImage(userId: Comment['userId']) {
    const currentUser = this.users.find((user)=> user.id === userId);
    this.commentCurrentUserInfo = currentUser || this.commentCurrentUserInfo;
  };

  closeUserPopup() {
    this.showUserPopup = false;
  };

  handleInputFocusEvent(focused: boolean) {
    if (!focused) {
      this.showUserPopup = false;
    };
  };

  handleUserSelectedEvent(user: User) {
    this.taggedUser = user;
    this.filterUsers('');
    this.showUserPopup = false;
  };

  onClickOutside(event: Event) {
    if (!['popup', 'user-list', 'user-item', 'message-input'].some(className => (event.target as HTMLElement).classList.contains(className)))
      this.closeUserPopup();
  };

  filterUsers(query: string) {
    const splitQuery = query.split(' ');
    const lastword = splitQuery[splitQuery.length - 1];
    const matchQueryPrefixList = splitQuery.filter((word) => {
      return word.charAt(0).toLowerCase() === '@';
    });
    const sanitizedQueryList = matchQueryPrefixList.map((match => {
      return match.slice(1).toLowerCase();
    }));

    if (matchQueryPrefixList.length >= 1 && lastword.includes('@')) {
      this.showUserPopup = true;
      this.filteredUsers = this.users.filter((user: User) => {
        if (sanitizedQueryList.some((query) => user.name.toLowerCase().includes(query.toLowerCase()))) {
          return user;
        }
        return;
      });
    } else {
      this.showUserPopup = false;
    };
  };

  convertDateTime(timestamp: Date) {
    let hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();

    const amOrPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${formattedMinutes} ${amOrPm}`;
  };
};
