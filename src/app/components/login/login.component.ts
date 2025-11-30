import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErrorDTO } from '../../models/ErrorDTO';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private service : AuthServiceService) { }

  login() {
    this.service.login(this.username, this.password).subscribe({
      next: (response) => {
        window.alert('Login efetuado!');
        window.location.href = '/create-market-list';
      },
      error: (e: ErrorDTO) => {
        window.alert('Erro ao efetuar login, verifique suas credenciais ou crie uma conta.');
      }
    });
  }

  toRegiter() {
    window.location.href = '/register'; 
  }
}
