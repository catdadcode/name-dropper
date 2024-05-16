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
      this.activateMention();
    } else if (event.key === 'Enter') {
      if (event.shiftKey) {
        return;
      } else if (this.isMentionActive && this.filteredUsers.length > 0) {
        this.handleMentionSelection(event);
      } else {
        this.submitComment();
        event.preventDefault();
      }
    } else if (event.key === 'ArrowDown' && this.isMentionActive) {
      this.navigateMentionList(1);
      event.preventDefault();
    } else if (event.key === 'ArrowUp' && this.isMentionActive) {
      this.navigateMentionList(-1);
      event.preventDefault();
    } else if (event.key === 'Escape' && this.isMentionActive) {
      this.deactivateMention();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  activateMention(): void {
    this.isMentionActive = true;
    this.filteredUsers = this.users;
  }

  handleMentionSelection(event: KeyboardEvent): void {
    if (this.filteredUsers.length && this.selectedUserIndex >= 0) {
      this.selectUser(this.filteredUsers[this.selectedUserIndex]);
      event.preventDefault();
      event.stopPropagation();
      this.isMentionActive = false;
    }
  }

  navigateMentionList(direction: number): void {
    const newIndex = this.selectedUserIndex + direction;
    if (newIndex >= 0 && newIndex < this.filteredUsers.length) {
      this.selectedUserIndex = newIndex;
    }
  }

  deactivateMention(): void {
    this.escaped = true;
    this.isMentionActive = false;
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
      this.isValidMentionContext(lastAtPos, cursorPosition)
    ) {
      this.activateMention();
      const filterText = textUpToCursor.substring(lastAtPos + 1);
      this.filteredUsers = this.users.filter((user) =>
        user.name.toLowerCase().includes(filterText.toLowerCase()),
      );
    } else {
      this.isMentionActive = false;
    }
  }

  isValidMentionContext(atIndex: number, cursorPosition: number): boolean {
    const textAfterAt = this.message.substring(atIndex, cursorPosition);
    return textAfterAt.indexOf(' ') === -1 && textAfterAt.indexOf('\n') === -1;
  }

  selectUser(user: User): void {
    const cursorPosition = this.mentioner.nativeElement.selectionStart;
    const textUpToCursor = this.message.substring(0, cursorPosition);
    const lastAtPos = textUpToCursor.lastIndexOf('@');

    const firstMessagePart = this.message.substring(0, lastAtPos);
    const mention = `@${user.name}#${user.id}`;
    const restOfMessage = this.message.substring(cursorPosition);

    this.message = `${firstMessagePart}${mention}${restOfMessage}`;
    this.isMentionActive = false;
    this.selectedUserIndex = 0;

    // Place cursor after the mention
    const finalCursorPosition = firstMessagePart.length + mention.length;
    setTimeout(() => {
      this.mentioner.nativeElement.setSelectionRange(
        finalCursorPosition,
        finalCursorPosition,
      );
    }, 0);
  }

  submitComment(): void {
    const mentionRegex = /@(\w+)#(\d+)/g;
    let match;
    const mentions: number[] = [];

    while ((match = mentionRegex.exec(this.message)) !== null) {
      mentions.push(parseInt(match[2], 10));
    }

    for (const mention of mentions) {
      const user = this.users.find((u) => u.id === mention);
      if (!user) throw new Error(`User with ID ${mention} not found`);
      alert(
        `Mentioned ${user.name} with ID ${user.id}. Pretend this alert is the mentioned users getting notifications.`,
      );
    }

    this.messageSubmit.emit({
      userId: 1, // Replace with the actual user ID
      text: this.message,
      mentions,
    });

    this.message = '';
  }
}
