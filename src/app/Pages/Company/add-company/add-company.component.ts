import { Component } from '@angular/core';
import { CommonApiService } from 'src/app/services/commonApi.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent {
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
