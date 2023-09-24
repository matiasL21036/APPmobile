import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa AlertController

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string = ''; // Deja el campo de nombre de usuario vacío
  password: string = '';

  constructor(private router: Router, private alertController: AlertController) {} // Inyecta AlertController

  async login() { // Usa async para mostrar la alerta correctamente
    if (this.username === 'alumno' && this.password === '123') {
      // Usuario y contraseña de alumno válidos, redirige a la página de inicio de alumno
      this.router.navigate(['/inicio', 'alumno']);
    } else if (this.username === 'profesor' && this.password === '123') {
      // Usuario y contraseña de profesor válidos, redirige a la página de inicio de profesor
      this.router.navigate(['/profesor']);
    } else {
      // Usuario y/o contraseña incorrectos, muestra un mensaje de error utilizando AlertController
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario y/o contraseña incorrectos. Por favor, inténtelo nuevamente.',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }
}
