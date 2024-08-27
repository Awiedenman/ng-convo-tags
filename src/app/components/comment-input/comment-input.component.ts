import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() taggedUser = {}
  commentControl = new FormControl('');

  // May still need this
  // submitComment(event: MouseEvent): void {
  //   if(this.commentControl !== null){
  //     this.commentEvent.emit(this.commentControl);
  //   }
  // };

  onKeyup(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    if (event.key === '@') { // Fire anytime it detects the symbol and filtering happens at parent so it can be passed to popup.
      this.mentionEvent.emit(value);
    } else if (event.key === 'Enter') {
      this.commentEvent.emit(value);
      this.commentControl.setValue('');
    } else {
      this.mentionEvent.emit(value);
    }
  }

  onFocus() {
    this.inputFocus.emit(true);
  }

  insertTagName() {
    console.log('userToBeInserted:: ', this.taggedUser)
  }

};
