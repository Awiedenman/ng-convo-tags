import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationService } from '../../shared/services/conversation.service'
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
  styleUrl: './conversation.component.scss'
})
export class ConversationComponent implements OnInit {
  comments: Comment[] = [];
  showUserPopup = false;
  users: User[] = []
  filteredUsers: User[] = []
  taggedUser: User = {
    name: '',
    photo: '',
    id: 0,
    taggedConversationIds: []
  };

  constructor(private conversationService: ConversationService, private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.comments = this.conversationService.getComments();
    this.users = this.userService.getUsers();
  }

  convertDateTime(timestamp: Date) {
    let hours = timestamp.getHours()
    const minutes = timestamp.getMinutes()

    const amOrPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${amOrPm}`
  }

  addComment(comment: string): void {
    const timestamp = new Date();
    const newComment: Comment = {
      id: this.conversationService.getComments.length + 1,
      userId: 6, // hard coded bc as of now it is only me that can input comments/
      recipient: this.taggedUser.id,
      timestamp: timestamp,
      displayTime: this.convertDateTime(timestamp),
      text: comment,
    };

    this.conversationService.createComment(newComment);
    this.comments = this.conversationService.getComments();
    // would make api call to add this converstaion ID to the users array of tagged conversations
    this.notificationService.sendNotifcation(newComment)
    this.closeUserPopup();
  }

  closeUserPopup() {
    this.showUserPopup = false;
  }

  handleInputFocus(focused: boolean) {
    if (!focused) {
      this.showUserPopup = false;
    }
  }

  onClickOutside(event: Event) {
    if (!['popup', 'user-list', 'user-item', 'message-input'].some(className => (event.target as HTMLElement).classList.contains(className)))
      this.closeUserPopup();
  }

  filterUsers(query: string) {
    const splitQuery = query.split(' ');
    const lastword = splitQuery[splitQuery.length - 1];
    const matchQueryPrefixList = splitQuery.filter((word) => {
      return word.charAt(0).toLowerCase() === '@';
    })
    const sanitizedQueryList = matchQueryPrefixList.map((match => {
      return match.slice(1).toLowerCase();
    }))

    if (matchQueryPrefixList.length >= 1 && lastword.includes('@')) {
      this.showUserPopup = true;
      this.filteredUsers = this.users.filter((user: User) => {
        if (sanitizedQueryList.some((query) => user.name.toLowerCase().includes(query.toLowerCase()))) {
          return user;
        }
        return;

      })
    } else {
      this.showUserPopup = false;
    }
  }

  handleInsertUserOnClick(user: User) {
    this.taggedUser = user;
    this.filterUsers('')
    this.showUserPopup = false;
  }
};
