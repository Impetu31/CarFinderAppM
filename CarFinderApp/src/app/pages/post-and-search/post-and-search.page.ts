import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  autoReportado: boolean = false;
  loggedInUser: any;

  constructor(private router: Router) {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    if (!this.loggedInUser) {
      alert('Debe iniciar sesión para acceder a esta página.');
      this.router.navigate(['/login']);
    }
  }

  buscarAuto() {
    if (!this.loggedInUser) {
      alert('Debe iniciar sesión para utilizar esta funcionalidad.');
      this.router.navigate(['/login']);
      return;
    }

    console.log(`Buscando auto con patente: ${this.patente}`);
    
    const reportados = JSON.parse(localStorage.getItem('reportados') || '[]');
    const autoEncontrado = reportados.find((auto: any) => auto.patente === this.patente);

    if (autoEncontrado) {
      this.autoReportado = true;
      alert('Este auto está reportado como robado. Proporcione más información.');
    } else {
      this.autoReportado = false;
      alert('Este auto no está reportado como robado.');
    }
  }

  onFileSelected(event: any) {
    this.foto = event.target.files[0];
  }

  enviarReporte() {
    if (!this.loggedInUser) {
      alert('Debe iniciar sesión para utilizar esta funcionalidad.');
      this.router.navigate(['/login']);
      return;
    }

    if (this.autoReportado && this.direccion) {
      console.log(`Enviando reporte para auto ${this.patente} desde ${this.direccion}`);
      
      let reportados = JSON.parse(localStorage.getItem('reportados') || '[]');
      reportados = reportados.filter((auto: any) => auto.patente !== this.patente);
      
      localStorage.setItem('reportados', JSON.stringify(reportados));
      
      alert('Auto marcado como encontrado y eliminado de la lista de robados.');
    } else {
      alert('Por favor, ingresa la dirección.');
    }
  }

  reportarAuto() {
    if (!this.loggedInUser) {
      alert('Debe iniciar sesión para utilizar esta funcionalidad.');
      this.router.navigate(['/login']);
      return;
    }

    console.log(`Reportando auto con patente: ${this.patente}, Descripción: ${this.descripcion}`);
    
    if (this.foto) {
      console.log(`Foto seleccionada: ${this.foto.name}`);
      
      const reportados = JSON.parse(localStorage.getItem('reportados') || '[]');
      
      reportados.push({
        patente: this.patente,
        descripcion: this.descripcion,
        direccion: '',
        foto: this.foto.name,
        userEmail: this.loggedInUser.email
      });
      
      localStorage.setItem('reportados', JSON.stringify(reportados));
      
      alert('Auto reportado con éxito.');
    } else {
      alert('Por favor, selecciona una foto.');
    }
  }
}
