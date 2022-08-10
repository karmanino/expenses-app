import { Component, OnInit } from '@angular/core';
import * as auth from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginFromGroup: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  loginUser() {
    if(this.loginFromGroup.invalid) return;
    Swal.showLoading();
    Swal.fire({
      title: 'Please wait',
      text: 'Checking your login details...',
      didOpen: () => Swal.showLoading(),
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
    const { email, password } = this.loginFromGroup.value;
    this.authService
      .loginUser(email, password)
      .then((_) => {
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch((error) => {
        let modalParams: SweetAlertOptions = {
          icon: 'error',
          title: 'Oops..',
          text: this.authService.convertErrorCodeToMessage(error.code),
        };

        if (error.code === 'auth/user-not-found')
          modalParams = { ...modalParams, footer: '<a href="/register">Register now to start using Expenses App</a>' };

        Swal.fire(modalParams);
      });
  }
}
