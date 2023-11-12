import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
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
    { nombre: 'Ingles Intermedio', porcentaje: 76.5 },
    { nombre: 'Estadistica Descriptiva', porcentaje: 72.7 },
    { nombre: 'Arquitectura', porcentaje: 83.3 },
    { nombre: 'Etica Para El Trabajo', porcentaje: 100 },
  ];

  constructor(
    private animationCtrl: AnimationController,
    private elementRef: ElementRef,
    private renderer: Renderer2
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
    this.renderer.removeClass(element, 'rojo');
    this.renderer.removeClass(element, 'amarillo');
    this.renderer.removeClass(element, 'verde');
  
    if (porcentaje < 75) {
      this.renderer.addClass(element, 'rojo');
    } else if (porcentaje === 75) {
      this.renderer.addClass(element, 'amarillo');
    } else {
      this.renderer.addClass(element, 'verde');
    }
  }
  

  aumentarPorcentaje(index: number) {
    if (index >= 0 && index < this.asignaturas.length) {
      this.asignaturas[index].porcentaje += 5;

      const progressBar = this.elementRef.nativeElement.querySelector(
        '.progress-bar-' + (index + 1)
      );
      if (progressBar) {
        const width = this.asignaturas[index].porcentaje + '%';
        this.animateProgressBar(progressBar, width);
        this.updateProgressBarColor(progressBar, this.asignaturas[index].porcentaje);
      }

      this.mostrarImagenYGuardarMensaje();
    }
  }

  mostrarImagenYGuardarMensaje() {
    const imageToDisplay = this.elementRef.nativeElement.querySelector('#imageToDisplay');
    if (imageToDisplay) {
      this.renderer.setStyle(imageToDisplay, 'display', 'block');
    }

    const mensaje = "Ubicación: Paicavi 3280, Hora del Dispositivo: " + new Date().toLocaleString();
    localStorage.setItem('mensaje', mensaje);
  }
}
