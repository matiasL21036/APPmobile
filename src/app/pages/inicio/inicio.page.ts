import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  username: string;

  constructor(private route: ActivatedRoute,private barcodeScanner: BarcodeScanner) {
    // Obtiene el nombre de usuario desde la ruta
    const usernameParam = this.route.snapshot.paramMap.get('username');
    this.username = usernameParam !== null ? usernameParam : 'Invitado'; // Asigna un valor predeterminado en caso de que sea null


    
  }
  scannear() {
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        if (barcodeData.cancelled) {
          console.log('Escaneo cancelado por el usuario.');
        } else {
          console.log('Barcode data:', barcodeData.text);
        }
      })
      .catch((err) => {
        console.error('Error al escanear:', err);
      });
  }
}


