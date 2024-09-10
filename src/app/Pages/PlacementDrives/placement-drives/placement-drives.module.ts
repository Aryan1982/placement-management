import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlacementDrivesComponent } from './placement-drives.component';

const routes: Routes = [
  { path: '', component: PlacementDrivesComponent },
];

@NgModule({
  declarations: [PlacementDrivesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PlacementDrivesModule { }
