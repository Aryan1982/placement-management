import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FacultyListComponent } from './faculty-list.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: FacultyListComponent },
];

@NgModule({
  declarations: [FacultyListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class FacultyListModule { }
