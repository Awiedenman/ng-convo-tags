import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConversationComponent } from './components/conversation/conversation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConversationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-convo-tags';
}
