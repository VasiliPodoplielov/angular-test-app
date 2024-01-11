import { Injectable } from '@angular/core';
import { BaseStorageService } from './base.storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService extends BaseStorageService{

  constructor() {
    super(localStorage);
  }
}
