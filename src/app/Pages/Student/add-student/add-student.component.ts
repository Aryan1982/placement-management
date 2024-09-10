// add-student.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonApiService } from 'src/app/services/commonApi.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent {
  studentForm: FormGroup;
  studentId!: string;
  branches: any;

  constructor(
    private formBuilder: FormBuilder,
    private commonApiService: CommonApiService,
    private route: ActivatedRoute,
    private router: Router
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
      enrollment_no: ['', Validators.required],
      branch:['', Validators.required]
    });
  }

  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get('id')!;
    if (this.studentId) {
      this.getStudentDetails();
    }
    this.getBranches()
  }

  getBranches(){
    this.commonApiService.getRequest('api/collections/Branch/records').subscribe((res:any)=>{
      this.branches = res.items
    })
  }

  getStudentDetails() {
    this.commonApiService
      .getRequest(`/api/collections/Student/records/${this.studentId}`)
      .subscribe((res: any) => {
        this.studentForm.patchValue({
          email: res.email,
          first_name: res.first_name,
          middle_name: res.middle_name,
          last_name: res.last_name,
          current_sem: res.current_sem,
          student_contact: res.student_contact,
          parent_contact: res.parent_contact,
          college_id: res.college_id,
          home_town: res.home_town,
          current_town: res.current_town,
          permanent_addr: res.permanent_addr,
          current_addr: res.current_addr,
          enrollment_no: res.enrollment_no,
        });
      });
  }
  submitStudentForm(): void {
    console.log(this.studentForm)
    if (this.studentForm.invalid) {
      alert('fill all the fields');
      this.studentForm.markAllAsTouched();
      return;
    }
    if (this.studentId) {
      this.commonApiService
        .patchRequest(
          `/api/collections/Student/records/${this.studentId}`,
          this.studentForm.value
        )
        .subscribe((response) => {
          this.router.navigateByUrl('/studentlist');
        });
      return;
    }

    this.commonApiService
      .postRequest('/api/collections/Student/records', this.studentForm.value)
      .subscribe((res: any) => {
        this.router.navigateByUrl('/studentlist');
      });
  }

  get formControls() {
    return this.studentForm.controls;
  }
}
