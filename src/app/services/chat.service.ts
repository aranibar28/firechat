import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Mensaje } from '../interface/mensaje.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private itemsCollection!: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];

  constructor(private afs: AngularFirestore) {}

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', (ref) =>
      ref.orderBy('fecha', 'desc').limit(5)
    );
    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: Mensaje[]) => {
        this.chats = [];
        for (let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }
        return this.chats;
      })
    );
  }

  agregarMensajes(texto: string) {
    let mensaje: Mensaje = {
      nombre: 'Gerson Demo',
      mensaje: texto,
      fecha: new Date().getTime(),
    };
    return this.itemsCollection.add(mensaje);
  }
}
