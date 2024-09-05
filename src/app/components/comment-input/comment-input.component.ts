import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-comment-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './comment-input.component.html',
  styleUrl: './comment-input.component.scss',
})
export class CommentInputComponent {
  @Output() commentEvent = new EventEmitter<string>();
  @Output() mentionEvent = new EventEmitter<string>();
  @Output() inputFocusEvent = new EventEmitter<boolean>();
  @Input() taggedUser: User = {
    name: '',
    id: 0,
    photoURL: '',
    taggedConversationIds: [],
  };
  @ViewChild('commentInput') commentInput!: ElementRef<HTMLInputElement>;
  commentControl = new FormControl('');
  submitDisabled: boolean = true;

  constructor(private userService: UserService) {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['taggedUser']) this.insertTagName(this.taggedUser);
  };

  sendCommentEvent(value: string) {
    const users = this.userService.getUsers();
    this.commentEvent.emit(value);
    this.commentControl.setValue('');
  };

  onUserClick(event: MouseEvent) {
    const value = this.commentInput.nativeElement.value;
    this.sendCommentEvent(value);
    this.submitDisabled = true;
  };

  onUserKeyup(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.submitDisabled = false;

    if (event.key === '@') {
      this.mentionEvent.emit(value);
    } else if (event.key === 'Enter') {
      if (!value.length) return;
      this.sendCommentEvent(value);
      this.submitDisabled = true;
    } else {
      this.mentionEvent.emit(value);
    };
  };

  onFocus() {
    this.inputFocusEvent.emit(true);
  };

  insertTagName(user: User) {
    const currentValue = this.commentInput.nativeElement.value;
    const newValue = ` @${user.name} `;
    const trimmmedValue = currentValue.substring(0, currentValue.lastIndexOf(' '))
    this.commentInput.nativeElement.value = trimmmedValue + newValue;
    this.commentInput.nativeElement.focus();
  };
};
