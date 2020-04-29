import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ErrorResponseHandler } from 'src/app/util/response.message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showModal: boolean;
  loginForm: FormGroup;
  submitted = false;
  error = '';
  formLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public authenticationService: AuthenticationService,
    private toaster: ToastrService
  ) { }

  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['niranjan', Validators.required],
      password: ['Niranjan95@', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onLoginClick() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.error = '';
    this.formLoading = false;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.authenticationService.start();
          this.router.navigate(['/home']);
        },
        error => {
          this.error = ErrorResponseHandler.getResponseMessage(error.status, error.statusText);
          this.toaster.error(this.error, 'Error');
          this.authenticationService.stop();
        });
    this.formLoading = false;
  }

  onLogoutClick() {
    this.authenticationService.logout();
  }
}