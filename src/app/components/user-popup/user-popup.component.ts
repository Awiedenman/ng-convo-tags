import { Component, EventEmitter, Input, Output, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-popup.component.html',
  styleUrl: './user-popup.component.scss'
})
export class UserPopupComponent {
  @Input() isOpen = false;
  @Output() closePopupEvent = new EventEmitter<void>();

  onOutsideClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('popup')) {
      this.closePopupEvent.emit();
    }
  }

}
