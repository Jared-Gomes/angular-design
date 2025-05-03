import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet], // Only needs RouterOutlet
  template: '<router-outlet></router-outlet>', // Template contains only the outlet
  // No need for styles here unless you want global app-root styles
})
export class AppComponent {
  // App component is now just the entry point for the router
}
