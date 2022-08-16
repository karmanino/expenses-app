import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

import { AuthService } from 'src/app/services/auth.service';
import * as ui from 'src/app/shared/ui.actions';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {

  loading = false;
  uiSubscrption: Subscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);

  loginFromGroup: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.uiSubscrption.unsubscribe();
  }

  loginUser() {
    if (this.loginFromGroup.invalid) return;

    this.store.dispatch(ui.isLoading());

    // Swal.showLoading();
    // Swal.fire({
    //   title: 'Please wait',
    //   text: 'Checking your login details...',
    //   didOpen: () => Swal.showLoading(),
    //   allowOutsideClick: false,
    //   allowEscapeKey: false,
    // });
    const { email, password } = this.loginFromGroup.value;
    this.authService
      .loginUser(email, password)
      .then((_) => {
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.store.dispatch(ui.stopLoading());
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
