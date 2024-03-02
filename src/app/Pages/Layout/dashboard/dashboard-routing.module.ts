import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'studentlist', loadChildren: () => import('../../Student/student-list/student-list.module').then(m => m.StudentListModule) },
      { path: 'companylist', loadChildren: () => import('../../Company/company-list/company-list.module').then(m => m.CompanyListModule) },
      { path: 'studentprofile', loadChildren: () => import('../../Student/studentProfile/studentProfile.module').then(m => m.StudentProfileModule) },
      // Other child routes can be added here if needed
      // { path: '**', redirectTo: 'login', pathMatch: 'full' }, // Redirect unknown child paths to login
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
