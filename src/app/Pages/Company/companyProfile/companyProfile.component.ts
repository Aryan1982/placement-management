import { Component } from '@angular/core';
import { CommonApiService } from 'src/app/services/commonApi.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './companyProfile.component.html',
  styleUrls: ['./companyProfile.component.scss']
})
export class CompanyProfile {
  studentData: any;
  constructor(
    private commonApiService:CommonApiService
  ){}
  ngOnInit(): void {
    // this.commonApiService.getRequest('/api/collections/StudentData/records').subscribe((res:any)=>{
    //   this.studentData = res.items;
    //   // console.log(res.items[0].)
    // })
  }

}
