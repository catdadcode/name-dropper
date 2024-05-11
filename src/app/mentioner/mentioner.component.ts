import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import type { User } from 'types/User';

@Component({
  selector: 'mentioner',
  standalone: true,
  imports: [],
  templateUrl: './mentioner.component.html',
  styleUrl: './mentioner.component.css',
})
export class MentionerComponent {
  @Input() users: User[];
  @ViewChild('mentioner') mentioner: ElementRef;

  constructor() {
    this.autoGrow();
  }

  autoGrow(): void {
    console.log('adjusting...');
    const textArea = this.mentioner.nativeElement;
    textArea.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = `${textArea.scrollHeight}px`;
  }
}
