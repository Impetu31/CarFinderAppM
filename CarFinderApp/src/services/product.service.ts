import { Injectable } from '@angular/core';
import { Product, Notificacion } from 'src/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [];

  constructor() {
    // Cargar los productos desde el local storage al iniciar el servicio
    this.products = JSON.parse(localStorage.getItem('products') || '[]');
  }

  getAll(): Product[] {
    return this.products;
  }

  getProductsByUser(userEmail: string): Product[] {
    return this.products.filter(product => product.userEmail === userEmail);
  }

  // Verificar si la patente ya existe
  existePatente(patente: string): boolean {
    return this.products.some(product => product.patente === patente.toUpperCase());
  }

  add(product: Product): boolean {
    if (this.existePatente(product.patente)) {
      return false; // La patente ya existe
    }
    product.id = this.products.length + 1;
    product.patente = product.patente.toUpperCase(); // Convertir a mayúsculas
    this.products.push(product);
    this.saveToLocalStorage();
    return true; // Auto agregado con éxito
  }

  addNotificacion(productId: number, notificacion: Notificacion) {
    const product = this.products.find((p) => p.id === productId);
    if (product) {
      notificacion.id = (product.notificaciones?.length || 0) + 1;
      if (!product.notificaciones) {
        product.notificaciones = [];
      }
      product.notificaciones.push(notificacion);
      this.saveToLocalStorage();
    }
  }

  marcarRecuperado(productId: number) {
    const product = this.products.find((p) => p.id === productId);
    if (product) {
      product.status = 'Recuperado';
      this.saveToLocalStorage();
    }
  }

  borrarAutosYNotificaciones() {
    localStorage.removeItem('products'); // Borra solo los autos reportados y notificaciones
    this.products = []; // Limpia la lista local
    this.saveToLocalStorage();
    alert('Los autos reportados y notificaciones han sido borrados.');
  }

  private saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }
  existeCorreo(email: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.some((user: any) => user.email === email);
  }
  

}
