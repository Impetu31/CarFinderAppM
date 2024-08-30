import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Guardar usuario en Local Storage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ email: this.email, password: this.password });
    localStorage.setItem('users', JSON.stringify(users));

    // Redirigir a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}

