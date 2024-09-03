export interface Product {
    id: number;
    patente: string;
    descripcion: string;
    direccion?: string;
    foto?: string;
    userEmail: string; // Usuario que reportó el robo
    status: 'Robado' | 'Recuperado';
    notificaciones?: Notificacion[];
  }
  
  export interface Notificacion {
    id: number;
    mensaje: string;
    direccion?: string;
    foto?: string;
    status?: 'Visto' | 'Recuperado';
  }
  