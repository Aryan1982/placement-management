import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonApiService } from 'src/app/services/commonApi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    public commonApiService: CommonApiService,
    private formBuilder: FormBuilder,
    public router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      identity: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  userLogin() {
    this.commonApiService
      .postRequest(
        'api/collections/users/auth-with-password',
        this.loginForm.value
      )
      .subscribe({
        next: (res: any) => {
          if (res.record.role.toLowerCase() == 'student') {
            this.commonApiService
              .getRequest(
                `/api/collections/Student/records?filter=(email="${res.record.email}")`
              )
              .subscribe((student: any) => {
                console.log(student.items[0].id);
                res.record.studentId = student.items[0].id;
                localStorage.setItem('userRecord', JSON.stringify(res.record));
                this.router.navigateByUrl('/companylist');
                return;
              });
          }
          localStorage.setItem('userRecord', JSON.stringify(res.record));
          this.router.navigateByUrl('/studentlist');
        },
        error: (error) => {
          console.error('An error occurred:', error);
          // Handle error here, for example:
          if (error.status === 400) {
            alert('Unauthorized. Please check your credentials.');
          } else {
            alert('An error occurred. Please try again later.');
          }
        },
      });
  }
}
