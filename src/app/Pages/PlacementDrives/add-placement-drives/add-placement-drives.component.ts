import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonApiService } from 'src/app/services/commonApi.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-placement-drives',
  templateUrl: './add-placement-drives.component.html',
  styleUrls: ['./add-placement-drives.component.scss']
})
export class AddPlacementDrivesComponent {
  placementDriveFrom: FormGroup;
  companyId: any;
  companies: any;
  status: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private commonApiService: CommonApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.placementDriveFrom = this.fb.group({
      company: ['', Validators.required],
      brochure: [''],
      email1: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      email2: ['', Validators.email],
      summary: ['', Validators.required],
      eligible_courses: [[], Validators.required],
      eligible_criteria: ['', Validators.required],
      selection_process_details: ['', Validators.required],
      expected_openings: ['', Validators.required],
      company_invitation: [''],
      job_role: [''],
      status: ['', Validators.required],
    });
  }
  ngOnInit(){
      this.companyId = this.route.snapshot.paramMap.get('id')!;
      if(this.companyId){
        this.getCompanyDetails()
      }
      this.getCompanyList()
      this.getStatus()
  }

  getStatus(){
    this.commonApiService.getRequest('api/collections/Status/records').subscribe((res:any)=>{
      this.status = res.items
    })
  }

  getCompanyList(){
    this.commonApiService.getRequest('api/collections/JobPosts/records').subscribe((res:any)=>{
      this.companies = res.items
    })
  }
  getCompanyDetails(){
    this.commonApiService.getRequest(`api/collections/JobPosts/records/${this.companyId}`).subscribe((res)=>{
      this.placementDriveFrom.patchValue({
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
    if(this.placementDriveFrom.invalid){
      alert('Fill all the details')
      return
    }
  
    if(this.companyId){
      this.commonApiService.patchRequest(`/api/collections/JobPosts/records/${this.companyId}`, this.placementDriveFrom.value)
        .subscribe(
          (response) => {
            this.router.navigateByUrl('/placement-drives')
          },
          (error) => {
            console.error('Error submitting form:', error);
          }
        );
      return;
    }
    this.commonApiService.postRequest('/api/collections/JobPosts/records', this.placementDriveFrom.value)
      .subscribe(
        (response) => {
          this.router.navigateByUrl('/placement-drives')
        },
        (error) => {
          console.error('Error submitting form:', error);
        }
      );
  }
}