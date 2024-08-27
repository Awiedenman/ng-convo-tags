import { Component, EventEmitter, Input, Output, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-user-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-popup.component.html',
  styleUrl: './user-popup.component.scss'
})
export class UserPopupComponent {
  @Input() isOpen = false;
  @Input() filteredUsers: User[] = [];
  @Output() closePopupEvent = new EventEmitter<void>();
  @Output() userSelected = new EventEmitter<User>();

  selectUser(event: Event, user: User) {
    this.closePopupEvent.emit();
    if ((event.target as HTMLElement).classList.contains('user-item')) {
      this.userSelected.emit(user);
    }
  }
}
