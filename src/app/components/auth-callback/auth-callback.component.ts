import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-callback',
  imports: [],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.scss'
})
export class AuthCallbackComponent {
  isLogged: boolean;

  constructor() {
    this.isLogged = !!localStorage.getItem('authToken');
    this.loadComponent();
  }

  loadComponent() {
    if (!this.isLogged) {
      window.location.href = '/about-page';
      return;
    }

    window.location.href = '/create-market-list';
  }
}
