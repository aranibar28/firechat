import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  chats: Observable<any[]>;
  constructor(db: AngularFirestore, public cs: ChatService) {
    this.chats = db.collection('chats').valueChanges();
  }
}
