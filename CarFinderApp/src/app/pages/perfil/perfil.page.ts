import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { Product, Notificacion } from 'src/models/product.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user: any;
  reportes: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.reportes = this.productService.getProductsByUser(this.user.email);
  }

  marcarRecuperado(productId: number) {
    this.productService.marcarRecuperado(productId);
    alert('Auto marcado como recuperado.');
    this.reportes = this.productService.getProductsByUser(this.user.email);
  }

  obtenerNotificaciones(product: Product): Notificacion[] {
    return product.notificaciones || [];
  }

  borrarAutosYNotificaciones() {
    this.productService.borrarAutosYNotificaciones();
    this.reportes = []; // Limpiar la lista de reportes en la vista
  }
}
