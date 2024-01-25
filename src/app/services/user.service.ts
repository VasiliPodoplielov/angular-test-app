import { Injectable, OnInit } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: firebase.auth.UserCredential | null = null;

  constructor(public localStorageService: LocalStorageService) {
    this.initialize();
  }

  initialize(): void {
    this.user = JSON.parse(this.localStorageService.get('user'));
  }

  getUserName(): null | string | undefined {
    if (!this.user) return null;

    return this.user.user?.displayName || this.user.user?.email;
  }
}
