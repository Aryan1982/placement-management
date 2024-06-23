import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonApiService } from 'src/app/services/commonApi.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent {
  companyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private commonApiService: CommonApiService
  ) {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      website: ['', Validators.required],
      brochure: [''],
      email1: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      email2: ['', Validators.email],
      summary: ['', Validators.required],
      eligible_courses: [[], Validators.required],
      eligible_criteria: ['', Validators.required],
      selection_process_details: ['', Validators.required],
      expected_openings: ['', Validators.required],
      company_invitation: ['']
    });
  }

  onSubmit() {
    // const brochureControl = this.companyForm.get('brochure');
    // console.log(brochureControl?.value)
    //   if (brochureControl && brochureControl.value instanceof File) {
    //   }
    if (this.companyForm.valid) {

      // Append regular form fields
      // Object.keys(this.companyForm.controls).forEach(key => {
      //   if (key !== 'brochure') {
      //     formData.append(key, this.companyForm.get(key)?.value);
      //   }
      // });
      const selectedEligibleCourses = this.companyForm.get('eligible_courses')?.value;
      console.log('Selected Eligible Courses:', selectedEligibleCourses);

      this.commonApiService.postRequest('/api/collections/CompanyDetails/records', this.companyForm.value)
        .subscribe(
          (response) => {
            console.log('Form submitted successfully!', response);
            // Handle success response
          },
          (error) => {
            console.error('Error submitting form:', error);
            // Handle error
          }
        );
    } else {
      console.error('Form is invalid');
    }
  }
}