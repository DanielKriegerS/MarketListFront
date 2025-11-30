import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  islogged: boolean = false;

  constructor() {
    this.verifyLogin();
  }

  verifyLogin(): void {
    const token = localStorage.getItem('authToken');
    this.islogged = this.verifyToken(token);
  }

  verifyToken(token: string | null): boolean {
    return token !== null && token.length > 0;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
    this.islogged = false;
  }
}
