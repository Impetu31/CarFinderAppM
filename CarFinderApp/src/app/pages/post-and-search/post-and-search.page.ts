import { Component } from '@angular/core';

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

  buscarAuto() {
    console.log(`Buscando auto con patente: ${this.patente}`);
    // Aquí simularías una búsqueda en la base de datos o Local Storage
    const reportados = JSON.parse(localStorage.getItem('reportados') || '[]');
    this.autoReportado = reportados.some((auto: any) => auto.patente === this.patente);

    if (!this.autoReportado) {
      alert('Este auto no está reportado como robado.');
    }
  }

  onFileSelected(event: any) {
    this.foto = event.target.files[0];
  }

  enviarReporte() {
    if (this.autoReportado && this.direccion) {
      console.log(`Enviando reporte para auto ${this.patente} desde ${this.direccion}`);
      if (this.foto) {
        console.log(`Foto seleccionada: ${this.foto.name}`);
      }
      // Lógica para enviar el reporte con la dirección y la foto
      alert('Reporte enviado con éxito.');
    } else {
      alert('Por favor, ingresa la dirección.');
    }
  }

  reportarAuto() {
    console.log(`Reportando auto con patente: ${this.patente}, Descripción: ${this.descripcion}`);
    if (this.foto) {
      console.log(`Foto seleccionada: ${this.foto.name}`);
      // Guardar el reporte en Local Storage
      const reportados = JSON.parse(localStorage.getItem('reportados') || '[]');
      reportados.push({ patente: this.patente, descripcion: this.descripcion, foto: this.foto.name });
      localStorage.setItem('reportados', JSON.stringify(reportados));

      alert('Auto reportado con éxito.');
    } else {
      alert('Por favor, selecciona una foto.');
    }
  }
}
