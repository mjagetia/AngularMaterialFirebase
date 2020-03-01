import {Timestamp} from '@firebase/firestore-types';
import {AngularFirestoreDocument, DocumentReference} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import FieldValue = firebase.firestore.FieldValue;

export interface Item {
  Name: string;
}

export interface PunchType {
  label: string;
  category: string;
}

export interface User {
  punchType?: PunchType;
  currentState: string;
  currentStateTime: FieldValue;
  displayName: string;
  localTime: Timestamp;
  serverTime: Timestamp | FieldValue;
  groups: any;
  theString: string;
  serverTimeJS?: Date;
  identity?: AngularFirestoreDocument<firebase.User>;
}

export interface Group {
  Name: string;
  ParentGroup: string;
  membersl: string[];
  members: [DocumentReference];
}

export interface PunchCardHistory {
  IP: string;
  userId: string;
  time: any;
  serverTime: any;
  type?: PunchType;
  displayName?: string;
}

export interface PunchCardGroupHistory {
  user?: User;
  identity?: Observable<firebase.User>;
  identityValue?: any;
  memberId?: string;
  memberName?: string;
  punchCardHistory?: Observable<PunchCardHistory[]>;
}

export interface PunchCard {
  IP: string;
  userId: string;
  time: Date;
  serverTime: any;
}
