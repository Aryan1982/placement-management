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
      { path: 'studentprofile/:id', loadChildren: () => import('../../Student/studentProfile/studentProfile.module').then(m => m.StudentProfileModule) },
      { path: 'companyprofile/:id', loadChildren: () => import('../../Company/companyProfile/companyProfile.module').then(m => m.CompanyProfileModule) },
      { path: 'add-student', loadChildren: () => import('../../Student/add-student/add-student.module').then(m => m.AddStudentModule) },
      { path: 'add-student/:id', loadChildren: () => import('../../Student/add-student/add-student.module').then(m => m.AddStudentModule) },
      { path: 'add-company', loadChildren: () => import('../../Company/add-company/add-company.module').then(m => m.AddCompanyModule) },
      { path: 'add-company/:id', loadChildren: () => import('../../Company/add-company/add-company.module').then(m => m.AddCompanyModule) },
      { path: 'add-placement-drives/:id', loadChildren: () => import('../../PlacementDrives/add-placement-drives/add-placement-drives.module').then(m => m.AddPlacementDrivesModule) },
      { path: 'add-placement-drives', loadChildren: () => import('../../PlacementDrives/add-placement-drives/add-placement-drives.module').then(m => m.AddPlacementDrivesModule) },
      { path: 'placement-drives', loadChildren: () => import('../../PlacementDrives/placement-drives/placement-drives.module').then(m => m.PlacementDrivesModule) },
      { path: 'faculty-list', loadChildren: () => import('../../Faculty/faculty-coordinator-list/faculty-list.module').then(m => m.CompanyListModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
