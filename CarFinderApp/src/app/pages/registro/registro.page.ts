import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service'; // Asegúrate de tener el servicio

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router, private productService: ProductService) {}

  register() {
    if (this.password !== this.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (this.productService.existeCorreo(this.email)) {
      alert("Este correo ya está registrado.");
      return;
    }

    // Guardar usuario en Local Storage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ username: this.username, email: this.email, password: this.password });
    localStorage.setItem('users', JSON.stringify(users));

    // Redirigir a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}
