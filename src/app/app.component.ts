import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MentionerComponent } from './mentioner/mentioner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MentionerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'name-dropper';
}
