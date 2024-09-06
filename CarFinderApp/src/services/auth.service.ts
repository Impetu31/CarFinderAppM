import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: any = null; // Usuario actual

  constructor() {
    this.loadUser();
  }

  // Cargar usuario del local storage si está autenticado
  loadUser() {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }

  // Iniciar sesión
  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(
      (user: any) => user.email === email && user.password === password
    );
    if (foundUser) {
      this.currentUser = foundUser;
      localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  }

  // Registrarse
  register(username: string, email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((user: any) => user.email === email)) {
      return false; // El correo ya está registrado
    }
    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    this.currentUser = newUser;
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    return true;
  }

  // Cerrar sesión
  logout() {
    this.currentUser = null;
    localStorage.removeItem('loggedInUser');
  }

  // Verificar si hay usuario autenticado
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // Obtener el usuario actual
  getCurrentUser() {
    return this.currentUser;
  }
}
