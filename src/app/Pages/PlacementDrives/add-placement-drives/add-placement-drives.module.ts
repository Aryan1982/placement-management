import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddPlacementDrivesComponent } from './add-placement-drives.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: AddPlacementDrivesComponent },
];

@NgModule({
  declarations: [AddPlacementDrivesComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class AddPlacementDrivesModule { }
