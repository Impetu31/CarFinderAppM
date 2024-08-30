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
    
    // Obtener la lista de autos reportados desde Local Storage
    const reportados = JSON.parse(localStorage.getItem('reportados') || '[]');
    
    // Buscar si la patente está en la lista de reportados
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
    if (this.autoReportado && this.direccion) {
      console.log(`Enviando reporte para auto ${this.patente} desde ${this.direccion}`);
      
      // Obtener la lista de autos reportados
      const reportados = JSON.parse(localStorage.getItem('reportados') || '[]');
      
      // Actualizar la información del auto reportado
      const autoIndex = reportados.findIndex((auto: any) => auto.patente === this.patente);
      if (autoIndex !== -1) {
        reportados[autoIndex].direccion = this.direccion;
        
        if (this.foto) {
          reportados[autoIndex].foto = this.foto.name;
          console.log(`Foto seleccionada: ${this.foto.name}`);
        }
        
        // Guardar la lista actualizada en Local Storage
        localStorage.setItem('reportados', JSON.stringify(reportados));
        
        alert('Reporte enviado con éxito.');
      }
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
      
      // Agregar el nuevo reporte
      reportados.push({
        patente: this.patente,
        descripcion: this.descripcion,
        direccion: '',
        foto: this.foto.name
      });
      
      // Guardar la lista actualizada en Local Storage
      localStorage.setItem('reportados', JSON.stringify(reportados));
      
      alert('Auto reportado con éxito.');
    } else {
      alert('Por favor, selecciona una foto.');
    }
  }
}
