import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CommonApiService } from 'src/app/services/commonApi.service';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
})
export class FacultyListComponent implements OnInit {
  public facultyList: any;
  studentId: any;
  constructor(
    public commonService: CommonService,
    public commonApiService: CommonApiService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getFacultyList();
  }

  
  getFacultyList() {
    this.commonApiService
      .getRequest('/api/collections/Faculty_cordinators/records?expand=branch')
      .subscribe((res: any) => {
        this.facultyList = res.items;
        this.facultyList = this.facultyList.reverse();
      });
  }

  navigateToFacultyProfile(id: number) {
    // this.router.navigateByUrl(`facultyProfile/${id}`);
  }

  editFaculty(id: number) {
    this.router.navigateByUrl(`/add-faculty/${id}`);
  }
}
