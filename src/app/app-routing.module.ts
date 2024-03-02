import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./Pages/Layout/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'login', loadChildren: () => import('./Pages/Auth/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./Pages/Auth/register/register.module').then(m => m.RegisterModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
