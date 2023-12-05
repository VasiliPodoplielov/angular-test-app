import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Credentials } from './models';
import { ToastService } from '../../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
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

  signIn({ email, password }: Credentials) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.toastService.showToast(`User with email ${email} successfully logged in`);
      })
      .catch((error) => {
        this.toastService.showToast(`ERROR: ${error.message}`);
        console.error(error)
      })
  }

  signUp({ email, password }: Credentials) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.toastService.showToast(`User with email ${email} successfully registered.`);
      })
      .catch((error) => {
        this.toastService.showToast(`ERROR: ${error.message}`);
        console.error(error)
      })
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

  forgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.toastService.showToast('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        this.toastService.showToast(`ERROR: ${error.message}`);
        console.error(error)
      });
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
