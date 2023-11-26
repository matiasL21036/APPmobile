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
    return this.utilsSvc.getFromLocalStorage('user');
  }
  ionViewWillEnter() {
    this.getAsignaturas();
  }

  // Obtener Asignaturas
  getAsignaturas() {
    let path = `users/${this.user().uid}/Clases`;

    let sub = this.FirebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        console.log(res);
        this.asignaturas = res;
        sub.unsubscribe();
      },
    });
  }

  ngAfterViewInit() {}
}
