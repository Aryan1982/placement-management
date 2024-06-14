import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CommonApiService } from 'src/app/services/commonApi.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})

export class CompanyListComponent implements OnInit {
  public companyList: any
  constructor(
    public commonService: CommonService,
    public commonApiService: CommonApiService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.getCompanyData();
  }

  getCompanyData() {
    console.log('getCompanies')
    this.commonApiService.getRequest('/api/collections/CompanyDetails/records').subscribe((res: any) => {
      this.companyList = res.items;
      console.log(this.companyList)
      this.companyList = this.companyList.reverse();
    })
  }

  nagivteToCompanyProfile(id: number) {
    this.router.navigateByUrl(`companyprofile/${id}`)
  }
}
