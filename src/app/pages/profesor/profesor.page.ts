import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage {
  asignaturas = [
    {
      nombre: 'PROGRAMACIÓN DE APLICACIONES MÓVILES',
      horaInicio: '12:11',
      horaTermino: '12:50',
    },
    {
      nombre: 'PROGRAMACIÓN DE ALGORITMOS',
      horaInicio: '14:10',
      horaTermino: '15:50',
    },
    // Agrega más asignaturas si es necesario
  ];

  constructor(private router: Router) {}

  verDetalles(asignatura: any) {
    // Navega a la vista de detalles de asignatura, puedes implementar esta función según tus necesidades
    // Por ejemplo:
    this.router.navigate(['/detalle-asignatura', asignatura.nombre]);
  }
}
