import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  theme: string = 'light';
  constructor() { }

  getTheme() {
    return this.theme;
  }

  setTheme(name: string) {
    this.theme = name;
  }

  getUserRole() {
    const userString = localStorage.getItem('userRecord');

    if (userString) {
      // Parse the string to an object
      const user = JSON.parse(userString);

      // Access the role property
      return user.role;
    }
  }

  
}
