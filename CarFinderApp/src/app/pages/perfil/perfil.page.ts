import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user: any;
  reportes: any[] = [];

  ngOnInit() {
    // Suponiendo que el usuario está almacenado en Local Storage
    this.user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    
    // Obtener reportes desde Local Storage
    this.reportes = JSON.parse(localStorage.getItem('reportados') || '[]').filter((reporte: any) => reporte.userEmail === this.user.email);
  }
}
