import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  username: string = ''; // Define la propiedad username en el componente InicioPage

  constructor(private route: ActivatedRoute) {
    // Recupera el nombre de usuario del parámetro pasado desde la página HomePage
    const usernameParam = this.route.snapshot.paramMap.get('username');
    if (usernameParam !== null) {
      this.username = usernameParam;
    }
  }
}
