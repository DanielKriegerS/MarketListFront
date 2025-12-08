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
  }
}
