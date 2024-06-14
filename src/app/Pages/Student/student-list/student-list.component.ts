import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CommonApiService } from 'src/app/services/commonApi.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  studentList: any;
  constructor(
    private commonApiService: CommonApiService,
    public commonService: CommonService,
    private router: Router
  ) { }
  ngOnInit(): void {
    // this.commonApiService.getRequest('/api/collections/StudentData/records').subscribe((res:any)=>{
    //   console.log(res)
    // })
    this.getStudents()
  }

  getStudents() {
    console.log('getstudents')
    this.commonApiService.getRequest('api/collections/Student/records?expand=department').subscribe((res: any) => {
      this.studentList = res.items;
      console.log(this.studentList)
      this.studentList = this.studentList.reverse();

    })
  }

  routeToProfile(id: number) {
    this.router.navigateByUrl(`/studentprofile/${id}`)
  }
}
