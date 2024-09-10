import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonApiService } from 'src/app/services/commonApi.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-faculty',
  templateUrl: './add-faculty.component.html'
})
export class AddFacultyComponent {
  facultyForm: FormGroup;
  facultyId: any;
  branches: any;

  constructor(
    private fb: FormBuilder,
    private commonApiService: CommonApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.facultyForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      branch: [''],
      faculty_id: ['', [Validators.required]],
    });
  }

  ngOnInit(){
      this.facultyId = this.route.snapshot.paramMap.get('id')!;
      if(this.facultyId){
        this.getCompanyDetails()
        console.log(this.facultyId)
      }
      this.getBranches()
  }

  getCompanyDetails(){
    this.commonApiService.getRequest(`/api/collections/Companies/records/${this.facultyId}`).subscribe((res)=>{
      this.facultyForm.patchValue({
      name: res.name,
      branch:res.mode_of_contact,
      email: res.contact_person,
      faculty_id: res.phone_no,
      });
    })
  }

  getBranches(){
    this.commonApiService.getRequest('api/collections/Branch/records').subscribe((res:any)=>{
      this.branches = res.items
    })
  }

  
  onSubmit() {
    if(this.facultyForm.invalid){
      alert('Fill all the details')
      return
    }
    
    if(this.facultyId){
      this.commonApiService.patchRequest(`/api/collections/Companies/records/${this.facultyId}`, this.facultyForm.value)
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
    
    this.commonApiService.postRequest('/api/collections/Faculty_cordinators/records', this.facultyForm.value)
      .subscribe(
        (response) => {
          // this.router.navigateByUrl('/companylist')
        },
        (error) => {
          console.error('Error submitting form:', error);
        }
      );
  }
}