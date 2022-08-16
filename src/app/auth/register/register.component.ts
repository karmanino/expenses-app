import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthError } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';

import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  loading = false;
  uiSubscrption = this.store.select('ui').subscribe((ui) => (this.loading = ui.isLoading));
  formGroup: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.uiSubscrption.unsubscribe();
  }

  createUser(): void {
    if (this.formGroup.invalid) return;
    const { name, email, password } = this.formGroup.value;
    this.store.dispatch(ui.isLoading());
    // Swal.fire({
    //   title: 'Please wait',
    //   text: 'Checking your details...',
    //   allowOutsideClick: false,
    //   allowEscapeKey: false,
    //   didOpen: () => Swal.showLoading(),
    // });

    this.authService
      .createUser(name, email, password)
      .then((_) => {
        this.store.dispatch(ui.stopLoading());
        // Swal.close();
        this.router.navigate(['/']);
      })
      .catch((error: AuthError) => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          timer: 5000,
          timerProgressBar: true,
          icon: 'error',
          title: 'Oops..',
          text: this.authService.convertErrorCodeToMessage(error.code),
        });
      });
  }
}
