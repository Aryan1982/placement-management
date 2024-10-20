import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CommonApiService } from 'src/app/services/commonApi.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  departments: any;
  constructor(
    public commonService:CommonService,
    private router:Router,
    private commonApiService:CommonApiService
  ){}

  logout(){
    localStorage.clear()
    this.router.navigateByUrl('/')
  }

  ngOnInit(){
    this.getDepartments()
  }

  routeToProfile(){
    const userString:any = localStorage.getItem('userRecord');
    const record = JSON.parse(userString) 
    this.router.navigateByUrl(`/studentprofile/${record.studentId}`)
  }

  getDepartments(){
    this.commonApiService.getRequest('/api/collections/Department/records').subscribe((res:any)=>{
      this.departments = res.items;
    })
  }
}
