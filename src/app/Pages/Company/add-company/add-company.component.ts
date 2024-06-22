import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonApiService } from 'src/app/services/commonApi.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent {
  companyForm: FormGroup;
  companyId: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private commonApiService: CommonApiService,
    private route: ActivatedRoute,
    private router: Router
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
  ngOnInit(){
      this.companyId = this.route.snapshot.paramMap.get('id')!;
      if(this.companyId){
        this.getCompanyDetails()
      }
  }

  getCompanyDetails(){
    this.commonApiService.getRequest(`/api/collections/CompanyDetails/records/${this.companyId}`).subscribe((res)=>{
      this.companyForm.patchValue({
        name: res.name,
        website: res.website,
        brochure: res.brochure,
        email1: res.email1,
        phone: res.phone,
        email2: res.email2,
        summary: res.summary,
        eligible_courses: res.eligible_courses,
        eligible_criteria: res.eligible_criteria,
        selection_process_details: res.selection_process_details,
        expected_openings: res.expected_openings,
        company_invitation: res.company_invitation
      });
    })
  }
  onSubmit() {
    if(this.companyForm.invalid){
      alert('Fill all the details')
      return
    }
    const selectedEligibleCourses = this.companyForm.get('eligible_courses')?.value;
    console.log('Selected Eligible Courses:', selectedEligibleCourses);
    
    if(this.companyId){
      this.commonApiService.patchRequest(`/api/collections/CompanyDetails/records/${this.companyId}`, this.companyForm.value)
        .subscribe(
          (response) => {
            this.router.navigateByUrl('/companylist')
          },
          (error) => {
            console.error('Error submitting form:', error);
          }
        );
      return;
    }
    this.commonApiService.postRequest('/api/collections/CompanyDetails/records', this.companyForm.value)
      .subscribe(
        (response) => {
          this.router.navigateByUrl('/companylist')
        },
        (error) => {
          console.error('Error submitting form:', error);
        }
      );
  }
}