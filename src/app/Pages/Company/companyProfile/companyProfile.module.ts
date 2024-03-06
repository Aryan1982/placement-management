import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompanyProfile } from './companyProfile.component';

const routes: Routes = [
  { path: '', component: CompanyProfile },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CompanyProfileModule { }
