import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [],
})
export class ChatComponent implements OnInit {
  mensaje: string = '';
  element: any;

  constructor(public cs: ChatService) {
    this.cs.cargarMensajes().subscribe(() => {
      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;
      }, 20);
    });
  }

  ngOnInit(): void {
    this.element = document.getElementById('app-mensajes');
  }

  enviar_mensaje() {
    if (this.mensaje.length == 0) {
      return;
    }
    this.cs
      .agregarMensajes(this.mensaje)
      .then(() => (this.mensaje = ''))
      .catch((err) => {
        console.log('ERROR AL ENVIAR MENSAJE', err);
      });
  }
}
