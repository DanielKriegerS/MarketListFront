import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';

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
    if (!this.username.trim() || !this.password.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    this.service.register(this.username, this.password).subscribe({
      next: (response) => {
        alert(response.message);
      },
      error: (error) => {
        alert('Erro ao registrar: ' + error.error.message);
      }
    });
  }
}
