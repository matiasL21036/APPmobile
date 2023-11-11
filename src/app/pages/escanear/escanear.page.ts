import { Component, OnInit } from '@angular/core';
import { AsignaturasService } from '../../servicios/asignaturas.service';

@Component({
  selector: 'app-escanear',
  templateUrl: './escanear.page.html',
  styleUrls: ['./escanear.page.scss'],
})
export class EscanearPage implements OnInit {
  constructor(private asignaturasService: AsignaturasService) {}

  ngOnInit() {}

  mostrarImagenYGuardarMensaje() {
    // Lógica para obtener el mensaje (simulado aquí)
    const mensaje =
      'Sección: EAY4470-003D, Ubicación: Paicavi 3280, Hora del Dispositivo: ' +
      new Date().toLocaleString();

    console.log(mensaje);

    // Busca la sección en el mensaje
    const seccionEncontrada = this.extraerSeccion(mensaje);
    console.log(seccionEncontrada);

    if (seccionEncontrada) {
      // Utiliza el servicio para incrementar el porcentaje
      const asignaturasActualizadas =
        this.asignaturasService.incrementarPorcentaje(seccionEncontrada);

      // No necesitas realizar ninguna acción específica aquí
      // ya que la actualización de la vista debe ocurrir automáticamente
    }
  }

  private extraerSeccion(mensaje: string): string | null {
    const match = mensaje.match(/Sección: (\w+)/);
    return match ? match[1] : null;
  }
}
