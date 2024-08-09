import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { CommonService } from 'src/app/services/common.service';
import { CommonApiService } from 'src/app/services/commonApi.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './companyProfile.component.html',
  styleUrls: ['./companyProfile.component.scss'],
})
export class CompanyProfile {
  companyData: any;
  companyId: any;

  studentDetails: FormGroup | undefined;
  studentId: any;
  userRecordString: any;
  hasApplied: boolean = false;

  constructor(
    public studentApplyDetailsForm: FormBuilder,
    public commonService: CommonService,
    public commonApiService: CommonApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userRecordString = localStorage.getItem('userRecord');
    this.companyId = this.route.snapshot.paramMap.get('id')!;
    this.studentId = JSON.parse(this.userRecordString).studentId;
    this.isStudentApplied();
    if (this.companyId) {
      this.commonApiService
        .getRequest(`/api/collections/CompanyDetails/records/${this.companyId}`)
        .subscribe((res: any) => {
          this.companyData = res;
        });
    }
  }

 async isStudentApplied() {
      this.hasApplied = await this.commonApiService.hasStudentAppliedToCompany(this.studentId, this.companyId);
  }

  applyToCompany() {
    if (!this.userRecordString) {
      return;
    }

    this.studentDetails = this.studentApplyDetailsForm.group({
      student_id: [this.studentId],
      company_id: [this.companyId],
    });
    this.commonApiService
      .postRequest(
        `/api/collections/Applications/records`,
        this.studentDetails.value
      )
      .subscribe((res: any) => {
        alert(`Applied successfully`);
      });
  }

  alreadyApplied() {
    alert('You have already applied to this company');
  }
}
