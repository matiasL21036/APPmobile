import { Component } from '@angular/core';
import { Horario } from './horario';
import { Router } from '@angular/router'; // Asegúrate de importar Router

@Component({
  selector: 'app-asistenciaprofe',
  templateUrl: './asistenciaprofe.page.html',
  styleUrls: ['./asistenciaprofe.page.scss'],
})
export class AsistenciaprofePage {
  diasSemana = ['L', 'M', 'X', 'J', 'V', 'S'];
  diaSeleccionado: string = '';
  asignaturasPorDia: any[] = [];

  constructor(private router: Router) {} // Inyecta el servicio Router en el constructor

  mostrarAsignaturas(dia: string) {
    this.diaSeleccionado = dia;

    // Accede a las asignaturas correspondientes al día seleccionado desde la estructura de datos Horario.
    this.asignaturasPorDia = Horario[dia] || [];
  }

  navegarADetalleprofesor() {
    // Cuando se hace clic en una asignatura, navega a la vista "asignaturaprofesor"
    this.router.navigateByUrl('/detalleprofesor');
  }
}
