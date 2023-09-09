import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string = 'admin'; // Establece el nombre de usuario predeterminado
  password: string = '123';
 
  constructor(private router: Router) {}

  login() {
    // Verifica si el usuario y la contraseña son válidos
    if (this.username === 'admin' && this.password === '123') {
      // Usuario y contraseña válidos, redirige a la página de inicio y pasa el nombre de usuario como parámetro
      this.router.navigate(['/inicio', { username: this.username }]);
    } else {
      // Usuario y/o contraseña incorrectos, muestra un mensaje de error
      alert('Usuario y/o contraseña incorrectos. Por favor, inténtelo nuevamente.');
    }
  }
}



