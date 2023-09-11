import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  username: string;

  constructor(private route: ActivatedRoute) {
    // Obtiene el nombre de usuario desde la ruta
    const usernameParam = this.route.snapshot.paramMap.get('username');
    this.username = usernameParam !== null ? usernameParam : 'Invitado'; // Asigna un valor predeterminado en caso de que sea null
  }
}

