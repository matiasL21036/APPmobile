import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit, AfterViewInit {
  asignaturas: { nombre: string; porcentaje: number }[] = [
    { nombre: 'Calidad De Software', porcentaje: 83.3 },
    { nombre: 'Programacion De Aplicaciones Moviles', porcentaje: 72.7 },
    { nombre: 'Proceso De Portafolio 4', porcentaje: 50 },
    { nombre: 'Ingles Intermedio	', porcentaje: 76.5 },
    { nombre: 'Estadistica Descriptiva', porcentaje: 72.7 },
    { nombre: 'Arquitectura', porcentaje: 83.3 },
    { nombre: 'Etica Para El Trabajo', porcentaje: 100 },
  ];

  constructor(
    private animationCtrl: AnimationController,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    for (let i = 0; i < this.asignaturas.length; i++) {
      const progressBar = this.elementRef.nativeElement.querySelector(
        '.progress-bar-' + (i + 1)
      );
      if (progressBar) {
        const width = this.asignaturas[i].porcentaje + '%';
        this.animateProgressBar(progressBar, width);
        this.updateProgressBarColor(progressBar, this.asignaturas[i].porcentaje);
      }
    }
  }

  animateProgressBar(element: HTMLElement, width: string) {
    const animation = this.animationCtrl
      .create()
      .addElement(element)
      .duration(1000)
      .fromTo('width', '0%', width);

    animation.play();
  }

  updateProgressBarColor(element: HTMLElement, porcentaje: number) {
    element.classList.remove('rojo', 'amarillo', 'verde');
    if (porcentaje < 75) {
      element.classList.add('rojo');
    } else if (porcentaje === 75) {
      element.classList.add('amarillo');
    } else {
      element.classList.add('verde');
    }
  }
}
