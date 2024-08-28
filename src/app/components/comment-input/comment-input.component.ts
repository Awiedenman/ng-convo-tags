import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-comment-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './comment-input.component.html',
  styleUrl: './comment-input.component.scss'
})
export class CommentInputComponent {
  @Output() commentEvent = new EventEmitter<string>();
  @Output() mentionEvent = new EventEmitter<string>();
  @Output() inputFocus = new EventEmitter<boolean>();
  @Input() taggedUser: User = {
    name: '',
    id: null,
    photo: '',
    taggedConversationIds: []
  };
  @ViewChild('commentInput') commentInput!: ElementRef<HTMLInputElement>;

  commentControl = new FormControl('');

  // May still need this
  // submitComment(event: MouseEvent): void {
  //   if(this.commentControl !== null){
  //     this.commentEvent.emit(this.commentControl);
  //   }
  // };
  ngOnChanges(changes: SimpleChanges) {
    if (changes['taggedUser']) this.insertTagName(this.taggedUser)
  }

  addComment(value: string) {
    this.commentEvent.emit(value);
    this.commentControl.setValue('');
  }

  onUserclick(event: MouseEvent) {
    const value = this.commentInput.nativeElement.value;
    this.addComment(value);
  }

  onKeyup(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    if (event.key === '@') { // Fire anytime it detects the symbol and filtering happens at parent so it can be passed to popup.
      this.mentionEvent.emit(value);
    } else if (event.key === 'Enter') {
      this.addComment(value);
    } else {
      this.mentionEvent.emit(value);
    }
  }

  onFocus() {
    this.inputFocus.emit(true);
  }

  insertTagName(user: User) {
    const currentValue = this.commentInput.nativeElement.value;
    const newValue = `@${user.name}`; // Value to add
    const trimmmedValue = currentValue.substring(0, currentValue.lastIndexOf(' '))
    this.commentInput.nativeElement.value = trimmmedValue + newValue;
  }
};
