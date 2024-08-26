import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-input.component.html',
  styleUrl: './comment-input.component.scss'
})
export class CommentInputComponent {
  @Output() commentSubmitted = new EventEmitter<string>();
  comment: string = '';

  submitComment(): void {
    if (typeof this.comment.trim() === 'string') { // null check and type check;
      this.commentSubmitted.emit(this.comment);
      this.comment = '';
    };
  };
  onInputChange(): void {
    const symbolTriggerPresent = this.comment.match(/^@/)
    if (symbolTriggerPresent) {
      console.log('show user list')
    };
  };
};
