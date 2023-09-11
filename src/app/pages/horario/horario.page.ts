import { Component } from '@angular/core';
import { Horario } from './horario'; // Ajusta la ruta a tu archivo horario.ts.

@Component({
  selector: 'app-horario',
  templateUrl: 'horario.page.html',
  styleUrls: ['horario.page.scss'],
})
export class HorarioPage {
  diasSemana = ['L', 'M', 'X', 'J', 'V', 'S'];
  diaSeleccionado: string = '';
  asignaturasPorDia: any[] = [];

  mostrarAsignaturas(dia: string) {
    this.diaSeleccionado = dia;
    
    // Accede a las asignaturas correspondientes al día seleccionado desde la estructura de datos Horario.
    this.asignaturasPorDia = Horario[dia] || [];
  }
}
