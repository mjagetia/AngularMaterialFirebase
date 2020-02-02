import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
// import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';

import {formatDate} from '@angular/common';
import { CollectionReference, Query } from '@firebase/firestore-types';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
// import Timestamp = firebase.firestore.Timestamp;
import { Timestamp } from '@firebase/firestore-types';
import FieldValue = firebase.firestore.FieldValue;

export interface Item { Name: string; }
export interface PunchType { label: string; category: string; }

export interface User {
  punchType?: string;
  currentState: string;
  currentStateTime: FieldValue;
  displayName: string;
  localTime: Timestamp;
  serverTime: Timestamp;
  groups: any;
  theString: string;
  serverTimeJS?: Date;
}

export interface Group {
  Name: string;
  ParentGroup: string;
  members: string[];
}


export interface PunchCardHistory {
  IP: string;
  userId: string;
  time: FieldValue | Date;
  serverTime: any;
  type?: PunchType;
  displayName?: string;
}

export interface PunchCard {
  IP: string;
  userId: string;
  time: Date;
  serverTime: any;
}

@Component({
  selector: 'app-first-block',
  templateUrl: './first-block.component.html',
  styleUrls: ['./first-block.component.scss']
})
export class FirstBlockComponent implements OnInit {
  titleOne = 'Welcome to Hidden Talent :)';
  contentOne = 'Punch In / Out';
  punchType: string;
  punchTypes: PunchType[] = [
    {label: 'in', category: 'in'},
    {label: 'break-out', category: 'out'},
    {label: 'break-in', category: 'in'},
    {label: 'out', category: 'out'}
  ];
  private itemsCollection: AngularFirestoreCollection<Item>;
  private usersCollection: AngularFirestoreCollection<User>;

  items: Observable<Item[]>;
  users: Observable<User[]>;
  private uid = '??';
  private iname = 'Unavailable';
  private user: Observable<User>;
  private punchCard: Observable<PunchCard>;
  private userId: string;
  private userName: string;
  private userDoc: AngularFirestoreDocument<User>;
  private punchCardDoc: AngularFirestoreDocument<PunchCard>;
  private groupDoc: AngularFirestoreDocument<Group>;
  private group: Observable<Group>;
  private myUser: User;
  private myPunchCard: PunchCard;
  curTime: any;
  private items$: any;
  private puchData: Observable<PunchCardHistory[]>;
  private punchData: PunchCardHistory[];
  private punchDataLatest: PunchCardHistory;

  /* transform(timestamp: Timestamp, format?: string): string {
     return formatDate(timestamp.toDate(), format || 'medium', this.locale);
   }*/

  updateTime() {

    this.curTime = new Date();
    // console.log(this.curTime);
    setTimeout(() => {
      this.updateTime();
    }, 1000);

  }

  constructor(@Inject(LOCALE_ID) private locale: string,
              private afs: AngularFirestore, private afAuth: AngularFireAuth) {
  }

  /*
    clockIn(){
      this.userDoc = afs.doc<Item>('user/david');
      this.tasks = this.userDoc.collection<User>('Users/' + this.userId).valueChanges();
    }
  */

  public changeValue(event, punchType: PunchType) {
    console.log(event);
    console.log(punchType);
    this.myUser.currentState = '5';
    this.punchType = punchType;
    this.myUser.punchType = this.punchType;
    this.myUser.localTime = firebase.firestore.Timestamp.fromDate(new Date('December 10, 1815'));
    this.myUser.serverTime = firebase.firestore.FieldValue.serverTimestamp();
    this.myUser.currentStateTime = firebase.firestore.FieldValue.serverTimestamp();

    console.log(this.myUser);
    this.userDoc.set(this.myUser, {merge: true});
    // let punch = new Punch
    // const newPunch = this.afs.collection('PunchCardHistory').doc();
    // newPunch.set({uid: this.userId, time: firebase.firestore.FieldValue.serverTimestamp()});
    const punchCardHistory: PunchCardHistory = {
      IP: "",
      serverTime: firebase.firestore.FieldValue.serverTimestamp(),
      userId: this.userId,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      displayName: this.userName,
      type: punchType
    };
    this.afs.collection('PunchCardHistory').add(punchCardHistory);

    // this.punchCardHistoryDoc = this.afs.doc<PunchCardHistory>('PunchCardHistory/' + this.userId + '');
    // this.punchCard = this.punchCardDoc.valueChanges();
    // this.punchCardDoc = this.afs.doc<PunchCard>('PunchCard/');
    // this.punchCard = this.punchCardDoc.valueChanges();

  }


  ngOnInit(): void {
    this.curTime = new Date();
    this.updateTime();
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.userName = user.displayName;

        // this.usersCollection = this.afs.collection<User>('Users');
        // console.log(this.usersCollection);
        this.userDoc = this.afs.doc<User>('Users/' + this.userId);
        this.user = this.userDoc.valueChanges();

        this.user.subscribe(user => {
          console.log(user);
          this.myUser = user;
          if (user && user.serverTime && user.serverTime.seconds) {
            this.myUser.serverTimeJS = new Date(user.serverTime.seconds);
          }
          // this.myUser.theString = JSON.stringify(user);
          // this.groupDoc = this.afs.doc<Group>('Groups/KbhWIJPjUcfjRtrxCAyP');
          // this.group = this.groupDoc.valueChanges();


          const td = new Date();
          td.setDate(1);
          td.setHours(0, 0, 0, 0);
          let myp;
          // ref.orderByChild("lastUpdatedTimestamp").startAt("1490187991");
          myp = this.afs.collection('PunchCardHistory',
              ref => ref.where('userId', '==', this.userId)
                // .startAt('2017-11-08T01:00:00+01:00')
               .where('time', '>', firebase.firestore.Timestamp.fromMillis(
                 Date.now() - (7 * 24 * 60 * 1000)))
                .limit(3)
               .orderBy('time', 'desc')
                );

          this.puchData = myp.valueChanges();
          this.puchData.subscribe(myp2 => {
            console.log(myp2);
            this.punchData = myp2;
            if (myp2 && myp2.length>0) {
              this.punchDataLatest = myp2[0];
            }
          });

          this.punchCardDoc = this.afs.doc<PunchCard>('PunchCard/' + this.userId);
          this.punchCard = this.punchCardDoc.valueChanges();

          this.punchCard.subscribe(punchCard => {
            if (punchCard === undefined) {
              // TODO open popup to create new account for first time punching
            } else {
              console.log(punchCard);
              this.myPunchCard = punchCard;
              this.myPunchCard.serverTime = firebase.firestore.FieldValue.serverTimestamp();
              this.myPunchCard.time = new Date();


              /*
                          const this.items$ = this.afs.collection('PunchCardHistory', ref => {
                            let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
                             query = query.where("uid", "==", this.userId);
                            return query;
                          })
                            .valueChanges();
                            */
              /*
                          // Create a reference to the cities collection
                          var punchCardHistoryRef = this.afs.collection("PunchCardHistory");

              // Create a query against the collection.
                          var query = punchCardHistoryRef.where("uid", "==", this.userId)

                            .get()
                            .then(function(querySnapshot) {
                              querySnapshot.forEach(function(doc) {
                                // doc.data() is never undefined for query doc snapshots
                                console.log(doc.id, " => ", doc.data());
                              });
                            })
                            .catch(function(error) {
                              console.log("Error getting documents: ", error);
                            });*/
            }
          });
        });
      }
    });
  }
}
