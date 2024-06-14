import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from './company-list.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: CompanyListComponent },
];

@NgModule({
  declarations: [CompanyListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CompanyListModule { }
