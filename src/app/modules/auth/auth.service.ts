import {Injectable, NgZone, OnDestroy, OnInit} from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { Credentials } from './models';
import { ToastService } from '../../services/toast.service';
import {catchError, from, Observable, ObservableInput, of, Subscription, tap} from 'rxjs';
import { AuthFirebaseService } from './auth.firebase.service';
import { LocalStorageService } from '../../services/local-storage.service';

// TODO: Use RxJS in each method.

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit, OnDestroy {
  userData: any;
  authStateSubscription: Subscription;

  constructor(
    public authFirebase: AuthFirebaseService,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public toastService: ToastService,
    public localStorage: LocalStorageService,
  ) {}

  ngOnInit() {
    this.authStateSubscription = this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;

        this.localStorage.set('user', JSON.stringify(this.userData));
      } else {
        this.localStorage.set('user', 'null');
      }
    })
  }

  signIn({ email, password }: Credentials): Observable<firebase.auth.UserCredential> {
    return this.authFirebase.signIn({ email, password }).pipe(
      tap(() => this.toastService.showToast(`User with email ${email} successfully logged in`)),
      catchError((error: firebase.auth.Error): ObservableInput<firebase.auth.UserCredential> => {
        this.toastService.showToast(`ERROR: ${error.message}`);

        return of({} as firebase.auth.UserCredential);
      })
    );
  }

  signUp({ email, password }: Credentials): Observable<firebase.auth.UserCredential> {
    return this.authFirebase.signUp({ email, password }).pipe(
      tap(() => {
        this.toastService.showToast(`User with email ${email} successfully registered.`)
      }),
      catchError((error: firebase.auth.Error): ObservableInput<firebase.auth.UserCredential> => {
        this.toastService.showToast(`ERROR: ${error.message}`)

        return of({} as firebase.auth.UserCredential);
      })
    )
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      this.localStorage.remove('user');
      this.router.navigate(['/auth/login']);
    })
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    }

    return userRef.set(userData, { merge: true });
  }

  forgotPassword(passwordResetEmail: string): void {
    from(this.afAuth.sendPasswordResetEmail(passwordResetEmail)).pipe(
      tap(() => this.toastService.showToast('Password reset email sent, check your inbox.')),
      catchError((error: firebase.auth.Error, caught): ObservableInput<void> => {
        this.toastService.showToast(`ERROR: ${error.message}`);

        return caught;
      })
    );
  }

  sendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
      // show toast or page that verification email has sent
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(this.localStorage.get('user')!);

    return user !== null && user.emailVerified !== false;
  }

  ngOnDestroy() {
    this.authStateSubscription.unsubscribe();
  }
}
