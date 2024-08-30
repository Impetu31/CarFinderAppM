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
      const autoIndex = reportados.findIndex((auto: any) => auto.patente === this.patente);
      
      if (autoIndex !== -1) {
        const auto = reportados[autoIndex];
        
        // Asegurarse de que la estructura de notificaciones esté bien formada
        let notificaciones = JSON.parse(localStorage.getItem('notificaciones') || '[]');
        let usuarioNotificaciones = notificaciones.find((noti: any) => noti.userEmail === auto.userEmail);

        // Si no existe una notificación para este usuario, se crea
        if (!usuarioNotificaciones) {
          usuarioNotificaciones = {
            userEmail: auto.userEmail,
            mensajes: [] // Se inicializa un array vacío para mensajes
          };
          notificaciones.push(usuarioNotificaciones);
        }

        // Asegurarse de que 'mensajes' es un array antes de usar 'push'
        if (!Array.isArray(usuarioNotificaciones.mensajes)) {
          usuarioNotificaciones.mensajes = [];
        }

        // Se añade el nuevo mensaje a la lista de mensajes del usuario
        usuarioNotificaciones.mensajes.push({
          mensaje: `El auto con patente ${this.patente} fue visto en ${this.direccion}.`,
          foto: this.foto ? this.foto.name : null
        });

        localStorage.setItem('notificaciones', JSON.stringify(notificaciones));

        // Remover el auto de la lista de robados
        reportados = reportados.filter((auto: any) => auto.patente !== this.patente);
        localStorage.setItem('reportados', JSON.stringify(reportados));

        alert('Reporte enviado con éxito. El usuario que reportó el auto robado ha sido notificado con la información proporcionada.');
      }
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
        userEmail: this.loggedInUser.email // Asociar reporte con usuario logueado
      });
      
      localStorage.setItem('reportados', JSON.stringify(reportados));
      
      alert('Auto reportado con éxito.');
    } else {
      alert('Por favor, selecciona una foto.');
    }
  }
}
