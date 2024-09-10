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
      mode_of_contact: ['', Validators.required],
      contact_person: [''],
      phone_no: ['', [Validators.required]],
      email: ['', Validators.email],
      email2: ['', Validators.email],
      remarks: [''],
      date_contacted: [[], Validators.required],
      phone2: [''],
      website: ['', Validators.required],
      description: [''],
    });
  }
  ngOnInit(){
      this.companyId = this.route.snapshot.paramMap.get('id')!;
      if(this.companyId){
        this.getCompanyDetails()
        console.log(this.companyId)
      }
  }

  getCompanyDetails(){
    this.commonApiService.getRequest(`/api/collections/Companies/records/${this.companyId}`).subscribe((res)=>{
      this.companyForm.patchValue({
      name: res.name,
      mode_of_contact:res.mode_of_contact,
      contact_person: res.contact_person,
      phone_no: res.phone_no,
      email: res.email,
      email2: res.email2,
      remarks: res.remarks,
      date_contacted: res.date_contacted,
      phone2: res.phone2,
      website: res.website,
      description: res.description,
      brochure: res.brochure,
      });
    })
  }
  onSubmit() {
    console.log(this.companyForm.value)
    if(this.companyForm.invalid){
      alert('Fill all the details')
      return
    }
    const selectedEligibleCourses = this.companyForm.get('eligible_courses')?.value;
    console.log('Selected Eligible Courses:', selectedEligibleCourses);
    
    if(this.companyId){
      this.commonApiService.patchRequest(`/api/collections/Companies/records/${this.companyId}`, this.companyForm.value)
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
    this.commonApiService.postRequest('/api/collections/Companies/records', this.companyForm.value)
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