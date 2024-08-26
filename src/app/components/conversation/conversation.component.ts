import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationService } from '../../shared/services/conversation.service'
import { Comment } from '../../shared/models/comment.model';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss'
})
export class ConversationComponent implements OnInit {
  comments: Comment[] = [];

  constructor(private conversationService: ConversationService) { }

  ngOnInit(): void {
    this.comments = this.conversationService.getComments();
  }
};
