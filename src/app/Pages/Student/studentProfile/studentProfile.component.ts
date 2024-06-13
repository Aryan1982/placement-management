import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonApiService } from 'src/app/services/commonApi.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './studentProfile.component.html',
  styleUrls: ['./studentProfile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  studentData: any;
  studentId: string | undefined;

  constructor(
    private commonApiService: CommonApiService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    // Get the student ID from the route parameters
    this.studentId = this.route.snapshot.paramMap.get('id')!;

    this.commonApiService.getRequest(`/api/collections/Student/records/${this.studentId}`).subscribe((res: any) => {
      this.studentData = res;
      console.log(res)
    });
  }
}
