import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CommonApiService } from 'src/app/services/commonApi.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent implements OnInit {
  public companyList: any;
  studentId: any;
  constructor(
    public commonService: CommonService,
    public commonApiService: CommonApiService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const userRecordString = localStorage.getItem('userRecord');
    if (userRecordString) {
      this.studentId = JSON.parse(userRecordString).studentId;
    }

    if (!this.studentId) {
      this.getCompanyData();
      return;
    }
    this.getCompanyListForStudent();
  }

  getCompanyListForStudent() {
    this.commonApiService
      .getCompaniesWithApplicationStatus(this.studentId)
      .then((companies: any) => {
        this.companyList = companies;
      })
      .catch((error: any) => {
        console.error('Error fetching companies:', error);
      });
  }
  
  getCompanyData() {
    this.commonApiService
      .getRequest('/api/collections/CompanyDetails/records')
      .subscribe((res: any) => {
        this.companyList = res.items;
        this.companyList = this.companyList.reverse();
      });
  }

  nagivteToCompanyProfile(id: number) {
    this.router.navigateByUrl(`companyprofile/${id}`);
  }

  editCompanyPost(id: number) {
    this.router.navigateByUrl(`/add-company/${id}`);
  }
}
