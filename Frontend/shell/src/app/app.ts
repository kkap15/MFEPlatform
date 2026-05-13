import { Component, signal } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('shell');
  
  constructor(public auth: AuthService) {}
  
}
