import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(
    public commonService:CommonService,
    private router:Router
  ){}

  logout(){
    localStorage.clear()
    this.router.navigateByUrl('/')
  }
}
