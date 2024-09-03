import { Injectable } from '@angular/core';
import { Product, Notificacion } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  private idCounter = 1;
  private notifCounter = 1;

  constructor() {
    this.loadProducts();
  }

  private loadProducts() {
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    this.products = storedProducts;
  }

  private saveProducts() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  getAll(): Product[] {
    return this.products;
  }

  getById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  add(product: Product) {
    product.id = this.idCounter++;
    this.products.push(product);
    this.saveProducts();
  }

  update(id: number, updatedProduct: Partial<Product>) {
    const product = this.getById(id);
    if (product) {
      Object.assign(product, updatedProduct);
      this.saveProducts();
    }
  }

  addNotificacion(productId: number, notificacion: Notificacion) {
    const product = this.getById(productId);
    if (product) {
      notificacion.id = this.notifCounter++;
      product.notificaciones = product.notificaciones || [];
      product.notificaciones.push(notificacion);
      this.saveProducts();
    }
  }

  marcarRecuperado(productId: number) {
    const product = this.getById(productId);
    if (product) {
      product.status = 'Recuperado';
      this.saveProducts();
    }
  }
}
