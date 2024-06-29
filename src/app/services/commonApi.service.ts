import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {
  private apiUrl = environment.url;

  constructor(
    private http: HttpClient
  ) { }

  getRequest(url: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${url}`)
  }

  postRequest(url: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${url}`, data)
  }

  patchRequest(url: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${url}`, data)
  }
}
