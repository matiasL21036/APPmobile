// asistencia.page.ts
import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { AnimationController, Animation } from '@ionic/angular';
import { AsignaturasService } from '../../servicios/asignaturas.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit, AfterViewInit {
  asignaturas: { nombre: string; porcentaje: number; seccion: string }[] = [];

  constructor(
    private animationCtrl: AnimationController,
    private elementRef: ElementRef,
    private asignaturasService: AsignaturasService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Suscríbete al servicio para recibir actualizaciones de las asignaturas
    this.asignaturasService.asignaturas$.subscribe((asignaturas) => {
      console.log('Asignaturas actualizadas:', asignaturas);
      this.asignaturas = asignaturas;
      this.cdRef.detectChanges(); // Forzar la detección de cambios
      console.log('Suscripción activa en AsistenciaPage');
    });
  }

  ngAfterViewInit() {
    // Lógica para animar las barras de progreso
    this.animateProgressBar();
  }

  private animateProgressBar() {
    // Obtén todas las barras de progreso
    const progressBars =
      this.elementRef.nativeElement.querySelectorAll('.progress-bar');

    // Crea una animación para cada barra de progreso
    progressBars.forEach((progressBar, index) => {
      const animation: Animation = this.animationCtrl
        .create()
        .addElement(progressBar)
        .duration(1000) // Duración de la animación en milisegundos
        .fromTo('width', '0%', `${this.asignaturas[index].porcentaje}%`);

      animation.play();
    });
  }
}
