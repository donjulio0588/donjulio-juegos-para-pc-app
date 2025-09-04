import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, ButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [MessageService],
  standalone: true,
})
export class App {
  protected readonly title = signal('frontend');
  constructor(private messageService: MessageService) {}

  show() {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Message Content',
      life: 3000,
    });
  }
}
