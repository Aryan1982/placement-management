import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CommonApiService } from 'src/app/services/commonApi.service';
import { CompanyListComponent } from '../../Company/company-list/company-list.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  studentList: any;
  dept: any;
  noStudents:boolean = false;
  constructor(
    private commonApiService: CommonApiService,
    public commonService: CommonService,
    private router: Router,
    private route:ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.dept = params.get('dept')!;
      
      if (this.dept) {
        this.getStudents(this.dept);
      } else {
        this.getStudents("");
      }
    });
  }
  
  getStudents(dept: string) {
    this.noStudents = false
    this.commonApiService.getRequest('api/collections/Student/records?expand=department,branch').subscribe((res: any) => {
      this.studentList = res.items;
  
      if (dept != "") {
        this.studentList = this.studentList.filter((student: any) => {
          return student.expand?.branch?.department === dept;
        });
        
      }
      this.studentList.length == 0 ? this.noStudents = true : this.noStudents = false
      this.studentList = this.studentList.reverse();
    });
  }
  

  routeToProfile(id: number) {
    this.router.navigateByUrl(`/studentprofile/${id}`)
  }

  editProfile(studentId: number){
    this.router.navigateByUrl(`/add-student/${studentId}`)
  }
}
