import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MentionerComponent } from './mentioner/mentioner.component';
import { UserService } from './user.service';
import type { User, Message } from 'types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MentionerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'name-dropper';
  users: User[] = [];
  messages: Message[] = [
    {
      userId: 1,
      text: 'Hello @Jeff#2',
      mentions: [2],
    },
    {
      userId: 2,
      text: "Oh hey @Kevin#1! How's it going? Have you seen @Gabbey#5?",
      mentions: [1, 5],
    },
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  handleNewMessage(message: Message): void {
    this.messages.push(message);
  }

  findUserName(userId: number): string {
    const user = this.users.find((user) => user.id === userId);
    if (!user) return 'You';
    return user.name;
  }

  formatMessage(text: string): string {
    const mentionRegex = /@(\w+)#(\d+)/g;
    return text.replace(mentionRegex, (match, username, id) => {
      return `<span class="font-bold text-blue-300">@${username}</span>`;
    });
  }

  statusIcon(status: string): string {
    switch (status) {
      case 'online':
        return '🟢';
      case 'idle':
        return '🟡';
      case 'busy':
        return '🔴';
      default:
        return status;
    }
  }
}
