import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { firebaseKeys } from './firebase.config';
import 'firebase/database';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  public ngOnInit(): void {
    console.log(firebaseKeys);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseKeys);
      firebase.database.enableLogging(true);
    }
  }
}
