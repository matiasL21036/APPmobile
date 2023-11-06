import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService,
    private router: Router
  ) {}

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc
        .signIn(this.form.value as User)
        .then((authResult) => {
          // Obtén el tipo de usuario desde Firebase
          this.firebaseSvc
            .getUserTipoUsuario(authResult.user.uid)
            .subscribe((tipoUsuario) => {
              if (tipoUsuario === 'alumno') {
                // Redirige al usuario a la página de inicio para alumnos
                this.router.navigate([
                  '/inicio',
                  { username: authResult.user.displayName },
                ]);
              } else if (tipoUsuario === 'profesor') {
                // Redirige al usuario a la página de inicio para profesores
                this.router.navigate([
                  '/profesor',
                  { username: authResult.user.displayName },
                ]);
              } else {
                // Tipo de usuario desconocido
                console.log('Tipo de usuario desconocido');
              }
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
          loading.dismiss();
        });
    }
  }

  ngOnInit() {
    // Lógica de inicialización si es necesaria
  }
}
