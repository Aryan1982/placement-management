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
      college_id: ['14', Validators.required],
      home_town: ['', Validators.required],
      current_town: ['', Validators.required],
      permanent_addr: [''],
      current_addr: ['', Validators.required],
      enrollment_no: ['', Validators.required]
    });
  }

  submitStudentForm(): void {
    if (this.studentForm.valid) {
      this.commonApiService.postRequest('/api/collections/Student/records', this.studentForm.value)
        .subscribe((res: any) => {
          console.log('Response from server:', res);
        }, (error) => {
          console.error('Error:', error);
        });
    } else {
      this.studentForm.markAllAsTouched();
      console.log(this.studentForm.value)
    }
  }

  get formControls() {
    return this.studentForm.controls;
  }
}
