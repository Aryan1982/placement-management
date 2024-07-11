import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CommonApiService } from 'src/app/services/commonApi.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './companyProfile.component.html',
  styleUrls: ['./companyProfile.component.scss'],
})
export class CompanyProfile {
  companyData: any;
  companyId: string | undefined;

  studentDetails: FormGroup | undefined;
  studentId: any;

  constructor(
    public studentApplyDetailsForm: FormBuilder,
    public commonService: CommonService,
    private commonApiService: CommonApiService,
    private route: ActivatedRoute
  ) {}

  applyToCompany() {
    const userRecordString = localStorage.getItem('userRecord');
    if (!userRecordString) {
      return;
    }
    this.studentId = JSON.parse(userRecordString).studentId;
    this.studentDetails = this.studentApplyDetailsForm.group({
      student_id: [this.studentId],
      company_id: [this.companyId ?? 'w4m20sdwz0v6adr'],
    });

    this.commonApiService
      .postRequest(
        `/api/collections/Student_applied/records`,
        this.studentDetails.value
      )
      .subscribe((res: any) => {
        console.log(
          `student with companyId ${this.companyId} applied successfully`
        );
        console.log('------------------------------------------------');
        console.log(res);
      });
  }

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id')!;
    this.commonApiService
      .getRequest(`/api/collections/CompanyDetails/records/${this.companyId}`)
      .subscribe((res: any) => {
        this.companyData = res;
        console.log(res);
      });
  }
}
