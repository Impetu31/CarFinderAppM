import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';  // Verifica que el path esté correcto

@Component({
  selector: 'app-registro',  // Cambié esto a "app-registro" para mantener consistencia
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {  // Cambié a "RegistroPage"
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    if (this.authService.register(this.username, this.email, this.password)) {
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'El correo ya está registrado.';
    }
  }
}
