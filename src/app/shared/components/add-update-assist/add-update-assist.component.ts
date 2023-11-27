import { Component, Inject, Input, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { asignatura } from 'src/app/models/asignaturas.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { updateDoc } from 'firebase/firestore';
@Component({
  selector: 'app-add-update-assist',
  templateUrl: './add-update-assist.component.html',
  styleUrls: ['./add-update-assist.component.scss'],
})
export class AddUpdateAssistComponent implements OnInit {
  @Input() asignatura: asignatura;

  firebaseSvc = Inject(FirebaseService);
  utilsSvc = Inject(UtilsService);
  ngOnInit() {}

  user(): User {
    console.log(this.utilsSvc.getFromLocalStorage('User'));
    return this.utilsSvc.getFromLocalStorage('User');
  }

  submit() {
    if (this.asignatura) this.updateAssist();
  }

  uid = JSON.parse(localStorage.getItem('user'))?.uid;

  async updateAssist() {
    let path = `users/${this.uid}/Clases/${this.asignatura.id}`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    this.firebaseSvc
      .updateDocument(path)
      .then(async (res) => {
        this.utilsSvc.dismissModal({ success: true });

        this.utilsSvc.presentToast({
          message: 'Asistencia Registrada con Éxito',
          duration: 1500,
          color: 'succes',
          position: 'middle',
          icon: 'checkmark-circle-outline',
        });
      })
      .catch((error) => {
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline',
        });
      })
      .finally(() => {
        loading.dissmiss();
      });
  }
}
