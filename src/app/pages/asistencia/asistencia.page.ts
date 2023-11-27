import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  Renderer2,
  inject,
} from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { UtilsService } from '../../services/utils.service';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { asignatura } from 'src/app/models/asignaturas.models';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit, AfterViewInit {
  utilsSvc = inject(UtilsService);
  FirebaseSvc = inject(FirebaseService);

  asignaturas: asignatura[] = [];

  ngOnInit() {}

  user(): User {
    console.log(this.utilsSvc.getFromLocalStorage('User'));
    return this.utilsSvc.getFromLocalStorage('User');
  }
  ionViewWillEnter() {
    this.getAsignaturas();
  }

  uid = JSON.parse(localStorage.getItem('user'))?.uid;

  // Obtener Asignaturas
  getAsignaturas() {
    console.log(this.uid);
    let path = `users/${this.uid}/Clases`;
    let sub = this.FirebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        this.asignaturas = res;
        sub.unsubscribe();
      },
    });
  }

  ngAfterViewInit() {}
}
