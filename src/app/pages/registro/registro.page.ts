import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  nombreUsuario: string = ''; // Inicializa las propiedades
  correo: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';

  constructor(private alertController: AlertController) {}

  ngOnInit() {}

  async registrarUsuario() {
    if (this.validarCampos()) {
      // Lógica para registrar al usuario
      // Aquí puedes agregar el código para enviar los datos al servidor, por ejemplo.

      // Muestra una alerta de registro exitoso
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: '¡Registro exitoso!',
        buttons: ['OK'],
      });

      await alert.present();
    } else {
      // Muestra una alerta de error si la validación falla
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos correctamente.',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }

  validarCampos(): boolean {
    // Realiza la validación de los campos aquí
    // Puedes agregar tus propias validaciones, por ejemplo, verificar que las contraseñas coincidan, etc.
    
    if (this.nombreUsuario.trim() === '' || this.correo.trim() === '' || this.contrasena.trim() === '' || this.confirmarContrasena.trim() === '') {
      return false; // Al menos un campo está vacío
    }

    if (this.contrasena !== this.confirmarContrasena) {
      return false; // Las contraseñas no coinciden
    }


    return true; // Todos los campos son válidos
  }
}
