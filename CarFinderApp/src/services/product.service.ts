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

  add(product: Product) {
    product.id = this.products.length + 1;
    this.products.push(product);
    this.saveToLocalStorage();
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
}
