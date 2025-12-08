import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { ErrorDTO } from '../../models/ErrorDTO';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
 username: string = '';
 password: string = '';

 constructor(private service : AuthServiceService) { }

  register() {
    this.validateData(this.username, this.password);
    this.service.register(this.username, this.password).subscribe({
      next: (response) => {
        alert('Registro bem-sucedido!');
      },
      error: (e:ErrorDTO) => {
        if( e.status === 409 ){
          alert('Nome de usuário já existe. Por favor, escolha outro ou faça login.');
          return;
        }

        alert('Erro ao registrar: ' + e.message);
      }
    });
  }

  toLogin() {
    window.location.href = '/login'; 
  }

  validateData(username: string, password: string) {
    if (!username || !password) {
      alert('Por favor, preencha todos os campos.');
      throw new Error('Validation failed: Missing username or password');
    }

    this.validatePassword(password);
    this.validateUsername(username);
  }

  validatePassword(password: string) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (password.length < minLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      alert('Senha fraca. A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.');
      throw new Error('Validation failed: Weak password');
    }
  }

  validateUsername(username: string) {
    if (username.length < 3) {
      alert('Nome de usuário inválido. Deve ter mais de 3 caracteres.');
      throw new Error('Validation failed: Invalid username');
    }
  }
}
