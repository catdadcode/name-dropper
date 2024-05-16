import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { User, Message } from 'types';

// Pretend we grabbed this dynamically from the authenticated user.
const currentUserId = 6;

@Component({
  selector: 'mentioner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mentioner.component.html',
  styleUrl: './mentioner.component.css',
})
export class MentionerComponent {
  @Input() users: User[] = [];
  @ViewChild('mentioner') mentioner: ElementRef<HTMLTextAreaElement>;
  @Output() messageSubmit = new EventEmitter<Message>();
  message: string = '';
  isMentionActive: boolean = false;
  filteredUsers: User[] = [];
  selectedUserIndex: number = 0;
  escaped: boolean = false;

  autoGrow(): void {
    const textArea = this.mentioner.nativeElement;
    textArea.style.height = '0px';
    textArea.style.height = `${textArea.scrollHeight}px`;
  }

  handleKeyDown(event: KeyboardEvent): void | false {
    if (event.key === '@') {
      this.isMentionActive = true;
      this.filteredUsers = this.users;
    } else if (event.key === 'Enter') {
      if (event.shiftKey) {
        return;
      } else if (this.isMentionActive) {
        if (this.filteredUsers.length && this.selectedUserIndex >= 0) {
          this.selectUser(this.filteredUsers[this.selectedUserIndex]);
          event.preventDefault();
          event.stopPropagation();
          this.isMentionActive = false;
        }
      } else {
        this.submitComment();
        event.preventDefault();
      }
    } else if (event.key === 'ArrowDown') {
      if (this.selectedUserIndex < this.filteredUsers.length - 1) {
        this.selectedUserIndex++;
      }
      event.preventDefault();
    } else if (event.key === 'ArrowUp') {
      if (this.selectedUserIndex > 0) {
        this.selectedUserIndex--;
      }
      event.preventDefault();
    } else if (event.key === 'Escape' && this.isMentionActive) {
      this.escaped = true;
      this.isMentionActive = false;
      event.preventDefault();
      event.stopPropagation();
    }
  }

  checkForAtSign(): void {
    if (this.escaped) {
      this.escaped = false;
      return;
    }
    const cursorPosition = this.mentioner.nativeElement.selectionStart;
    const textUpToCursor = this.message.substring(0, cursorPosition);
    const lastAtPos = textUpToCursor.lastIndexOf('@');

    if (
      lastAtPos !== -1 &&
      textUpToCursor.substring(lastAtPos).indexOf(' ') === -1 &&
      this.filteredUsers.length > 0
    ) {
      this.isMentionActive = true;
      const filterText = textUpToCursor.substring(lastAtPos + 1);
      this.filteredUsers = this.users.filter((user) =>
        user.name.toLowerCase().includes(filterText.toLowerCase()),
      );
    } else {
      this.isMentionActive = false;
    }
  }

  selectUser(user: User): void {
    const originalMessage = this.message;
    const atIndex = originalMessage.lastIndexOf('@');
    const spaceIndex = originalMessage.substring(atIndex).indexOf(' ');
    const firstMessagePart = originalMessage.substring(0, atIndex);
    const mention = `@${user.name}#${user.id}`;
    const restOfMessage = originalMessage.substring(atIndex + spaceIndex + 1);
    this.message = `${firstMessagePart}${mention} ${restOfMessage}`;
    this.mentioner.nativeElement.focus();
    this.isMentionActive = false;
  }

  submitComment(): void {
    const mentionRegex = /@(\w+)#(\d+)/g;
    let match;
    const mentions: number[] = [];

    while ((match = mentionRegex.exec(this.message)) !== null) {
      mentions.push(parseInt(match[2]));
    }

    for (const mention of mentions) {
      const user = this.users.find((u) => u.id === mention);
      if (!user) throw new Error(`User with ID ${mention} not found`);
      alert(
        `Mentioned ${user.name} with ID ${user.id}. Pretend this alert is the mentioned users getting notifications.`,
      );
    }

    this.messageSubmit.emit({
      userId: currentUserId,
      text: this.message,
      mentions,
    });
    this.message = '';
  }
}
