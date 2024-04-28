// add-student.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonApiService } from 'src/app/services/commonApi.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent {
  studentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private commonApiService: CommonApiService
  ) {
    this.studentForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      current_sem: ['', Validators.required],
      student_contact: ['', Validators.required],
      parent_contact: ['', Validators.required],
      college_id: ['', Validators.required],
      home_town: ['', Validators.required],
      current_town: ['', Validators.required],
      permanent_addr: ['', Validators.required],
      current_addr: ['', Validators.required],
      department: ['', Validators.required],
      enrollment_no: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.studentForm.valid) {
      this.commonApiService.postRequest('/api/collections/Student/records', this.studentForm.value)
        .subscribe((res: any) => {
          console.log('Response from server:', res);
          // Handle response as needed
        }, (error) => {
          console.error('Error:', error);
          // Handle error
        });
    } else {
      // Mark all fields as touched to display validation errors
      this.studentForm.markAllAsTouched();
    }
  }

  // Helper method to access form controls easily in the HTML template
  get formControls() {
    return this.studentForm.controls;
  }
}
