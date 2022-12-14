import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

const USERTOKEN = 'user-token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private localStorageService: LocalStorageService) { }

  isAuthenticated(): boolean {
    const token = this.localStorageService.getItems(USERTOKEN);
    if(token && token.length > 8) {
      return true;
    }

    return false;
  }
}
