// asignaturas.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AsignaturasService {
  private asignaturasSubject = new BehaviorSubject<
    { nombre: string; porcentaje: number; seccion: string }[]
  >([
    {
      nombre: 'Calidad De Software',
      porcentaje: 83.3,
      seccion: 'CSY4111',
    },
    {
      nombre: 'Programacion De Aplicaciones Moviles',
      porcentaje: 72.7,
      seccion: 'PGY4121',
    },
    {
      nombre: 'Proceso De Portafolio 4',
      porcentaje: 50,
      seccion: 'XXX1234',
    },
    { nombre: 'Ingles Intermedio', porcentaje: 76.5, seccion: 'INI5111' },
    {
      nombre: 'Estadistica Descriptiva',
      porcentaje: 72.7,
      seccion: 'MAT4140',
    },
    { nombre: 'Arquitectura', porcentaje: 83.3, seccion: 'ASY4131' },
    {
      nombre: 'Etica Para El Trabajo',
      porcentaje: 100,
      seccion: 'EAY4470',
    },
  ]);

  asignaturas$ = this.asignaturasSubject.asObservable();

  constructor() {}

  setAsignaturas(
    asignaturas: { nombre: string; porcentaje: number; seccion: string }[]
  ) {
    console.log('SetAsignaturas llamado con:', asignaturas);
    this.asignaturasSubject.next(asignaturas);
  }

  incrementarPorcentaje(
    seccion: string
  ): { nombre: string; porcentaje: number; seccion: string }[] | void {
    console.log(
      `Intentando incrementar porcentaje para la sección: ${seccion}`
    );
    const asignaturasActuales = this.asignaturasSubject.value;
    const index = asignaturasActuales.findIndex(
      (asignatura) => asignatura.seccion === seccion
    );

    if (index !== -1) {
      asignaturasActuales[index].porcentaje += 1;
      this.setAsignaturas([...asignaturasActuales]);
      console.log(
        `Porcentaje de ${seccion} incrementado a ${asignaturasActuales[index].porcentaje}%`
      );

      return [...asignaturasActuales]; // Devuelve las asignaturas actualizadas
    }

    return; // Retorna void si no se encuentra la sección
  }
}
