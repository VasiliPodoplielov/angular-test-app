import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { Credentials } from './models';
import { ToastService } from '../../services/toast.service';
import { catchError, from, Observable, ObservableInput, of, tap } from 'rxjs';
import { AuthFirebaseService } from './auth.firebase.service';

// TODO: Use RxJS in each method.

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    public authFirebase: AuthFirebaseService,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public toastService: ToastService,
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;

        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
      }
    })
  }

  signIn({ email, password }: Credentials): Observable<firebase.auth.UserCredential> {
    return this.authFirebase.signIn({ email, password }).pipe(
      tap(() => this.toastService.showToast(`User with email ${email} successfully logged in`)),
      catchError((error: firebase.auth.Error, caught): ObservableInput<firebase.auth.UserCredential> => {
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
      localStorage.removeItem('user');
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
    const user = JSON.parse(localStorage.getItem('user')!);

    return user !== null && user.emailVerified !== false;
  }
}
