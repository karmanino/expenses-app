import { Component, OnInit } from '@angular/core';
import { AuthError } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  createUser(): void {
    if (this.formGroup.invalid) return;
    const { name, email, password } = this.formGroup.value;
    Swal.fire({
      title: 'Please wait',
      text: 'Checking your details...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading(),
    });

    this.authService
      .createUser(name, email, password)
      .then((_) => {
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch((error: AuthError) =>
        Swal.fire({
          timer: 5000,
          timerProgressBar: true,
          icon: 'error',
          title: 'Oops..',
          text: this.authService.convertErrorCodeToMessage(error.code),
        })
      );
  }
}
