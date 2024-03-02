import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentProfileComponent } from './studentProfile.component';

const routes: Routes = [
  { path: '', component: StudentProfileComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class StudentProfileModule { }
