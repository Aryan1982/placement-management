import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root',
})
export class CommonApiService {
  private apiUrl = environment.url;
  pb: any;

  constructor(private http: HttpClient) {
    this.pb = new PocketBase('https://tnpsvit.pockethost.io');
  }

  getRequest(url: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${url}`);
  }

  postRequest(url: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${url}`, data);
  }

  patchRequest(url: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${url}`, data);
  }

  getCompaniesWithApplicationStatus(studentId: string) {
    return this.pb
      .collection('JobPosts')
      .getFullList({
        expand: 'company'  
      })
      .then((companies: any) => {
        return this.pb
          .collection('Applications')
          .getFullList({
            filter: `student_id = "${studentId}"`,
          })
          .then((applications: any) => {
            const appliedCompanyIds = new Set(
              applications.map((app: any) => app.company_id)
            );

            return companies.map((company: any) => {
              const hasApplied = appliedCompanyIds.has(company.id);
              return {
                ...company,
                hasApplied: hasApplied,
              };
            });
          });
      });
  }

  async hasStudentAppliedToCompany(studentId: string, companyId: string): Promise<boolean> {
    try {
      const result = await this.pb.collection('Applications').getFirstListItem(`student_id="${studentId}" && company_id="${companyId}"`);
      return !!result; // Return true if a record is found
    } catch (error: any) {
      if (error.status === 404) {
        return false; // Return false if no record is found
      }
      throw error; // Rethrow other errors for handling elsewhere
    }
  }
}
