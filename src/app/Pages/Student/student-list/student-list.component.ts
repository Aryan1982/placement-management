import { Component, OnInit } from '@angular/core';
import { CommonApiService } from 'src/app/services/commonApi.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  constructor(
    private commonApiService:CommonApiService
  ){}
  ngOnInit(): void {
    this.commonApiService.getRequest('/api/collections/StudentData/records').subscribe((res:any)=>{
      console.log(res)
    })
  }

 
}
