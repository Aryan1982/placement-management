import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonApiService } from 'src/app/services/commonApi.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './companyProfile.component.html',
  styleUrls: ['./companyProfile.component.scss']
})
export class CompanyProfile {
  companyData: any;
  comapanyId: string | undefined;

  constructor(
    private commonApiService: CommonApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.comapanyId = this.route.snapshot.paramMap.get('id')!;

    this.commonApiService.getRequest(`/api/collections/CompanyDetails/records/${this.comapanyId}`).subscribe((res: any) => {
      this.companyData = res;
      console.log(res)
    });
  }

}
