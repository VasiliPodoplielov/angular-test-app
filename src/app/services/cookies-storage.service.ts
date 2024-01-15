import { Injectable } from '@angular/core';
import { BaseStorageService } from './base.storage.service';

@Injectable({
  providedIn: 'root'
})
export class CookiesStorageService extends BaseStorageService {

  constructor() {
    super(sessionStorage);
  }
}
