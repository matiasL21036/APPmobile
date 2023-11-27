import { Component, OnInit, inject } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { User } from 'firebase/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { asignatura } from 'src/app/models/asignaturas.models';
import { AddUpdateAssistComponent } from 'src/app/shared/components/add-update-assist/add-update-assist.component';
@Component({
  selector: 'app-escanear',
  templateUrl: './escanear.page.html',
  styleUrls: ['./escanear.page.scss'],
})
export class EscanearPage implements OnInit {
  isSupported = false;
  clase: any;

  constructor(private alertController: AlertController) {}
  utilsSvc = inject(UtilsService);
  FirebaseSvc = inject(FirebaseService);

  asignaturas: asignatura[] = [];

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  user(): User {
    console.log(this.utilsSvc.getFromLocalStorage('User'));
    return this.utilsSvc.getFromLocalStorage('User');
  }

  uid = JSON.parse(localStorage.getItem('user'))?.uid;

  limpiarYParsearJSON(cadenaConEscape: string): any {
    // Eliminar los caracteres de escape y espacios innecesarios
    const cadenaLimpia = cadenaConEscape
      .replace(/\n/g, '')
      .replace(/\"/g, '"')
      .trim();

    // Parsear la cadena limpia a un objeto JSON
    const objetoJSON = JSON.parse(cadenaLimpia);
    return objetoJSON;
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }

    const { barcodes } = await BarcodeScanner.scan();
    this.clase = this.limpiarYParsearJSON(barcodes[0].rawValue);
    this.envioDatos(this.clase);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  envioDatos(data) {
    console.log(this.uid);
    let path = `users/` + this.uid + `/Clases`;
    this.FirebaseSvc.addAsistencia(path, data).then((res) => {
      console.log('Se guardó con éxito');
    });
  }
}
