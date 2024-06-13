import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent {
  constructor(
    public commonService: CommonService,
    private router: Router
  ) {
  }

  nagivteToCompanyProfile(id:number){
    this.router.navigateByUrl(`companyprofile/${id}`)
  }
}
