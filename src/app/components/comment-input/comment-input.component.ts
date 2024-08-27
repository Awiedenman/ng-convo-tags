import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  commentControl = new FormControl('');

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

  onBlur() {
    this.inputFocus.emit(false);
  }

  onFocus() {
    this.inputFocus.emit(true);
  }
};
