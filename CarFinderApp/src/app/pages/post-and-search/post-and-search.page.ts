import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service'; 
import { Product, Notificacion } from 'src/models/product.model';

@Component({
  selector: 'app-post-and-search',
  templateUrl: './post-and-search.page.html',
  styleUrls: ['./post-and-search.page.scss'],
})
export class PostAndSearchPage {
  segment: string = 'buscar';
  patente: string = '';
  descripcion: string = '';
  direccion: string = '';
  foto: File | null = null;
  autoReportado: Product | null = null; // Inicializamos con null
  loggedInUser: any;

  constructor(private router: Router, private productService: ProductService) {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    if (!this.loggedInUser) {
      alert('Debe iniciar sesión para acceder a esta página.');
      this.router.navigate(['/login']);
    }
  }

  buscarAuto() {
    const result = this.productService.getAll().find((product: Product) => product.patente === this.patente.toUpperCase());
    this.autoReportado = result || null;  // Asigna null si no se encuentra el auto

    if (this.autoReportado && this.autoReportado.status === 'Robado') {
      alert('Este auto está reportado como robado. Proporcione más información.');
    } else {
      alert('Este auto no está reportado como robado.');
    }
  }

  onFileSelected(event: any) {
    this.foto = event.target.files[0];
  }

  enviarReporte() {
    if (this.autoReportado && this.direccion) {
      const notificacion: Notificacion = {
        id: 0,
        mensaje: `El auto con patente ${this.patente} fue visto en ${this.direccion}.`,
        direccion: this.direccion,
        foto: this.foto ? this.foto.name : undefined,
        status: 'Visto'
      };
  
      this.productService.addNotificacion(this.autoReportado.id, notificacion);
      alert('Reporte enviado con éxito. El usuario que reportó el auto robado ha sido notificado con la información proporcionada.');
    } else {
      alert('Por favor, ingresa la dirección.');
    }
  }

  reportarAuto() {
    const newProduct: Product = {
      id: 0,
      patente: this.patente,
      descripcion: this.descripcion,
      userEmail: this.loggedInUser.email,
      status: 'Robado',
      notificaciones: []
    };

    // Verificar si la patente ya existe
    const agregado = this.productService.add(newProduct);
    if (!agregado) {
      alert('Este auto ya ha sido reportado.');
    } else {
      alert('Auto reportado con éxito.');
    }
  }
}
