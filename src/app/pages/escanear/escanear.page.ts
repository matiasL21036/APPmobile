import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-escanear',
  templateUrl: './escanear.page.html',
  styleUrls: ['./escanear.page.scss'],
})
export class EscanearPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  mostrarImagenYGuardarMensaje() {
    // Muestra la imagen
    const imageToDisplay = document.getElementById('imageToDisplay');
    imageToDisplay.style.display = 'block';
    
    // Almacena el mensaje en el localStorage
    const mensaje = "Ubicación: Paicavi 3280, Hora del Dispositivo: " + new Date().toLocaleString();
    localStorage.setItem('mensaje', mensaje);

    // Puedes mostrar una alerta o realizar otra acción después de guardar los datos
    alert('Imagen mostrada y mensaje guardado en localStorage.');
  }
}
