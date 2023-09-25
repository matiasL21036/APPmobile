import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  recuperarForm: FormGroup;

  constructor(
    private alertController: AlertController,
    private formBuilder: FormBuilder
  ) {
    // Inicializa el formulario y agrega las validaciones
    this.recuperarForm = this.formBuilder.group({
      correo: [
        '',
        [Validators.required, Validators.email]
      ]
    });
  }

  async enviarCorreo() {
    if (this.recuperarForm.invalid) {
      // Muestra una alerta si el formulario es inválido
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete el formulario correctamente.',
        buttons: ['OK'],
      });

      await alert.present();
    } else {
      // Envía el correo y muestra una alerta satisfactoria
      // Agrega tu lógica para enviar el correo aquí

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Se ha enviado un correo de recuperación de contraseña.',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }
}
