import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  theme:string = 'dark';
  constructor() {}

  getTheme(){
    return this.theme;
  }

  setTheme(name:string){
    this.theme = name;
  }
}
