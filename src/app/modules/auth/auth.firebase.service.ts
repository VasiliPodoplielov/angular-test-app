import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { Credentials } from './models';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public toastService: ToastService,
  ) {}

  signIn({ email, password }: Credentials): Observable<firebase.auth.UserCredential> {
    return new Observable((observer) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then((credentials: firebase.auth.UserCredential) => {
          observer.next(credentials);
        })
        .catch((error) => {
          observer.error(error);
        })
        .finally(() => observer.complete())
    })
  }

  signUp({ email, password }: Credentials): Observable<firebase.auth.UserCredential> {
    return new Observable((observer) => {
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((credentials: firebase.auth.UserCredential) => {
          observer.next(credentials);
        })
        .catch((error) => {
          observer.error(error);
        })
        .finally(() => observer.complete())
    })
  }
}
