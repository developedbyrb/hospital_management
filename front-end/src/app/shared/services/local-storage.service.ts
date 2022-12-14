import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItems(key: any) {
    const value = localStorage.getItem(key);
    return value;
  }

  setItem(key: any, value: any) {
    if(key && value) {
      localStorage.setItem(key, value);
    }
  }

  removeItem(key: any) {
    localStorage.removeItem(key);
  }
}
