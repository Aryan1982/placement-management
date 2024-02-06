import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'login', loadChildren: () => import('../../Auth/login/login.module').then(m => m.LoginModule) },
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
