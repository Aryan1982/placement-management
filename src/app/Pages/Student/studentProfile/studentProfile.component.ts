import { Component } from '@angular/core';
import { CommonApiService } from 'src/app/services/commonApi.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './studentProfile.component.html',
  styleUrls: ['./studentProfile.component.scss']
})
export class StudentProfileComponent {
  studentData: any;
  constructor(
    private commonApiService:CommonApiService
  ){}
  ngOnInit(): void {
    this.commonApiService.getRequest('/api/collections/StudentData/records').subscribe((res:any)=>{
      this.studentData = res.items;
      // console.log(res.items[0].)
    })
  }

}
