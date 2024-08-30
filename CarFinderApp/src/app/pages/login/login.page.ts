import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === this.email && u.password === this.password);

    if (user) {
      // Guardar el usuario conectado
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      // Redirigir a la página de post-and-search
      this.router.navigate(['/post-and-search']);
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  }
}
